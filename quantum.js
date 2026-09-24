(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const invSqrt2 = 1 / Math.sqrt(2);
  const complex = (r, i = 0) => ({ r, i });
  const add = (a, b) => complex(a.r + b.r, a.i + b.i);
  const sub = (a, b) => complex(a.r - b.r, a.i - b.i);
  const scale = (a, n) => complex(a.r * n, a.i * n);
  const mul = (a, b) => complex(a.r * b.r - a.i * b.i, a.r * b.i + a.i * b.r);
  const norm2 = a => a.r * a.r + a.i * a.i;
  const clean = n => Math.abs(n) < 1e-10 ? 0 : n;
  const number = n => Number(clean(n).toFixed(3)).toString();
  function formatComplex(a) {
    const r = clean(a.r), i = clean(a.i);
    if (!i) return number(r);
    if (!r) return `${number(i)}i`;
    return `${number(r)} ${i < 0 ? '−' : '+'} ${number(Math.abs(i))}i`;
  }
  const pct = p => `${Math.round(p * 100)}%`;
  const sample = probs => {
    const r = Math.random();
    let total = 0;
    for (let i = 0; i < probs.length; i++) { total += probs[i]; if (r < total || i === probs.length - 1) return i; }
  };

  // A normalized pure single-qubit state, simulated with complex amplitudes.
  let a = complex(1), b = complex(0), history = [];
  function applyGate(gate, showMessage = true) {
    if (gate === 'H') { const oldA = a, oldB = b; a = scale(add(oldA, oldB), invSqrt2); b = scale(sub(oldA, oldB), invSqrt2); }
    if (gate === 'X') [a, b] = [b, a];
    if (gate === 'Z') b = scale(b, -1);
    if (gate === 'S') b = mul(b, complex(0, 1));
    if (gate === 'T') b = mul(b, complex(invSqrt2, invSqrt2));
    history.push(gate);
    renderQubit();
    if (showMessage) $('qubit-result').textContent = `${gate} applied. The state and probabilities above are calculated from the full complex amplitudes.`;
  }
  function renderQubit() {
    const p0 = Math.min(1, Math.max(0, norm2(a))), p1 = Math.min(1, Math.max(0, norm2(b)));
    const real = a.r * b.r + a.i * b.i;
    const imag = a.r * b.i - a.i * b.r;
    const x = 2 * real, y = 2 * imag, z = p0 - p1;
    $('qubit-state').textContent = `(${formatComplex(a)})|0⟩ + (${formatComplex(b)})|1⟩`;
    $('bloch-coords').textContent = `Bloch coordinates  x ${number(x)} · y ${number(y)} · z ${number(z)}`;
    $('p0-label').textContent = pct(p0); $('p1-label').textContent = pct(p1);
    $('p0-bar').style.width = `${p0 * 100}%`; $('p1-bar').style.width = `${p1 * 100}%`;
    const px = 120 + 80 * (0.85 * x + 0.35 * y);
    const py = 120 - 80 * (0.88 * z + 0.18 * y);
    $('bloch-vector').setAttribute('x2', px.toFixed(1)); $('bloch-vector').setAttribute('y2', py.toFixed(1));
    $('bloch-point').setAttribute('cx', px.toFixed(1)); $('bloch-point').setAttribute('cy', py.toFixed(1));
    $('gate-sequence').replaceChildren();
    if (!history.length) { const empty = document.createElement('span'); empty.className = 'empty-sequence'; empty.textContent = '|0⟩ → measure'; $('gate-sequence').append(empty); }
    else history.forEach((gate, index) => { const chip = document.createElement('span'); chip.className = 'gate-chip'; chip.textContent = gate; chip.title = `Operation ${index + 1}: ${gate}`; $('gate-sequence').append(chip); });
  }
  document.querySelectorAll('[data-gate]').forEach(button => button.addEventListener('click', () => { $('qubit-shots').hidden = true; applyGate(button.dataset.gate); }));
  $('reset-qubit').addEventListener('click', () => { a = complex(1); b = complex(0); history = []; $('qubit-shots').hidden = true; $('qubit-result').textContent = 'Circuit reset to |0⟩.'; renderQubit(); });
  $('measure-one').addEventListener('click', () => {
    const before = [norm2(a), norm2(b)], outcome = sample(before);
    a = complex(outcome === 0 ? 1 : 0); b = complex(outcome === 1 ? 1 : 0);
    history.push('M'); renderQubit(); $('qubit-shots').hidden = true;
    $('qubit-result').textContent = `Measured ${outcome}. This one simulated shot had ${pct(before[outcome])} probability before measurement; the state is now |${outcome}⟩.`;
  });
  $('measure-hundred').addEventListener('click', () => {
    const p = [norm2(a), norm2(b)], counts = [0, 0];
    for (let i = 0; i < 100; i++) counts[sample(p)]++;
    $('shot-zero').style.width = `${counts[0]}%`; $('shot-one').style.width = `${counts[1]}%`;
    $('shot-zero-count').textContent = counts[0]; $('shot-one-count').textContent = counts[1];
    $('qubit-shots').hidden = false;
    $('qubit-result').textContent = '100 simulated shots: each shot re-prepares the current pre-measurement state. The displayed state has not collapsed.';
  });
  document.querySelectorAll('[data-preset]').forEach(button => button.addEventListener('click', () => {
    a = complex(1); b = complex(0); history = []; $('qubit-shots').hidden = true;
    [...button.dataset.preset].forEach(gate => applyGate(gate, false));
    $('qubit-result').textContent = button.dataset.preset === 'HH' ? 'H → H restores |0⟩. Amplitudes recombine so measuring 0 is certain.' : 'H → Z → H gives |1⟩. Z changes relative phase; the final H reveals it.';
    $('qubit-lab').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
  }));
  renderQubit();

  // Bell-state stages use q0 as the left bit in |q0 q1>.
  let bellStage = 0, bellBasis = 'Z';
  const bellStates = [
    [1, 0, 0, 0],
    [invSqrt2, 0, invSqrt2, 0],
    [invSqrt2, 0, 0, invSqrt2]
  ];
  function bellProbabilities() {
    if ($('classical-compare').checked) return bellBasis === 'Z' ? [0.5, 0, 0, 0.5] : [0.25, 0.25, 0.25, 0.25];
    const vector = bellStates[bellStage];
    if (bellBasis === 'Z') return vector.map(v => v * v);
    const rotated = [0, 0, 0, 0];
    for (let output = 0; output < 4; output++) for (let input = 0; input < 4; input++) {
      const left = ((output >> 1) & 1) & ((input >> 1) & 1);
      const right = (output & 1) & (input & 1);
      rotated[output] += vector[input] * ((left + right) % 2 ? -0.5 : 0.5);
    }
    return rotated.map(v => v * v);
  }
  function renderBell(message) {
    const comparing = $('classical-compare').checked;
    document.querySelectorAll('[data-bell-stage]').forEach(button => button.setAttribute('aria-pressed', button.dataset.bellStage === String(bellStage)));
    document.querySelectorAll('[data-basis]').forEach(button => button.setAttribute('aria-pressed', button.dataset.basis === bellBasis));
    $('classical-compare').disabled = bellStage !== 2;
    $('bell-h').classList.toggle('inactive', bellStage < 1);
    $('bell-control').classList.toggle('inactive', bellStage < 2);
    $('bell-target').classList.toggle('inactive', bellStage < 2);
    $('bell-state').textContent = comparing ? 'Classical mixture: 50% |00⟩, 50% |11⟩' : ['|00⟩', '(|00⟩ + |10⟩) / √2', '(|00⟩ + |11⟩) / √2'][bellStage];
    const probs = bellProbabilities(); const labels = bellBasis === 'Z' ? ['00', '01', '10', '11'] : ['++', '+−', '−+', '−−'];
    $('bell-distribution').replaceChildren();
    probs.forEach((prob, index) => {
      const item = document.createElement('div'); item.className = 'dist-item';
      const area = document.createElement('div'); area.className = 'column-area';
      const bar = document.createElement('i'); bar.style.height = `${prob * 100}%`; area.append(bar);
      const label = document.createElement('strong'); label.textContent = labels[index];
      const percent = document.createElement('small'); percent.textContent = pct(prob);
      item.append(area, label, percent); $('bell-distribution').append(item);
    });
    $('bell-result').textContent = message || (comparing ? `The classical mixture ${bellBasis === 'Z' ? 'matches Bell-pair Z-basis probabilities' : 'has four equal X-basis outcomes; the Bell pair does not'}.` : bellStage === 2 ? `Bell pair: in the ${bellBasis} basis, only matching outcomes occur in this ideal model.` : bellStage === 1 ? 'The qubits are still separable: q0 is in |+⟩ and q1 remains |0⟩.' : 'Both qubits begin in |0⟩.');
  }
  document.querySelectorAll('[data-bell-stage]').forEach(button => button.addEventListener('click', () => { bellStage = Number(button.dataset.bellStage); if (bellStage !== 2) $('classical-compare').checked = false; renderBell(); }));
  document.querySelectorAll('[data-basis]').forEach(button => button.addEventListener('click', () => { bellBasis = button.dataset.basis; renderBell(); }));
  $('classical-compare').addEventListener('change', () => renderBell());
  $('bell-shots').addEventListener('click', () => { const probs = bellProbabilities(), counts = [0, 0, 0, 0]; for (let i = 0; i < 200; i++) counts[sample(probs)]++; renderBell(`200 simulated shots: ${counts.join(' · ')} in the left-to-right order shown above. Each shot re-prepares the selected state.`); });
  renderBell();

  // Four-item Grover example: oracle sign flip, then inversion about mean.
  let groverStage = 0;
  function groverAmplitudes() {
    const target = Number($('grover-target').value);
    if (groverStage === 0) return [1, 0, 0, 0];
    const vector = [0.5, 0.5, 0.5, 0.5];
    if (groverStage >= 2) vector[target] *= -1;
    if (groverStage === 3) { const mean = vector.reduce((sum, v) => sum + v, 0) / 4; return vector.map(v => 2 * mean - v); }
    return vector;
  }
  function renderGrover() {
    const target = Number($('grover-target').value), vector = groverAmplitudes();
    const titles = ['0 / Start in |00⟩', '1 / Prepare equal superposition', '2 / Oracle flips the target phase', '3 / Diffusion amplifies the target'];
    const descriptions = ['Only 00 is present before preparation.', 'All four amplitudes are +0.5, so each outcome has 25% probability.', 'The marked amplitude is now −0.5. Every outcome still has 25% probability if measured now.', 'The mean signed amplitude was 0.25. Reflecting about it makes the target amplitude +1 and all others 0.'];
    $('grover-stage').textContent = titles[groverStage]; $('grover-explain').textContent = descriptions[groverStage];
    $('grover-bars').replaceChildren();
    vector.forEach((amplitude, index) => {
      const item = document.createElement('div'); item.className = 'amp-item';
      const label = document.createElement('div'); label.className = 'amp-label'; label.textContent = ['00','01','10','11'][index] + (index === target ? ' ✦' : '');
      const meter = document.createElement('div'); meter.className = 'amp-meter'; const bar = document.createElement('i'); if (amplitude < 0) bar.className = 'negative'; bar.style.height = `${Math.abs(amplitude) * 39}px`; meter.append(bar);
      const value = document.createElement('small'); value.textContent = `amplitude ${number(amplitude)}`;
      const probability = document.createElement('strong'); probability.textContent = `${pct(amplitude * amplitude)} chance`;
      item.append(label,meter,value,probability); $('grover-bars').append(item);
    });
    $('grover-next').disabled = groverStage === 3;
    $('grover-next').textContent = groverStage === 3 ? 'Complete ✓' : 'Next step →';
  }
  $('grover-target').addEventListener('change', () => { groverStage = 0; renderGrover(); });
  $('grover-next').addEventListener('click', () => { if (groverStage < 3) groverStage++; renderGrover(); });
  $('grover-reset').addEventListener('click', () => { groverStage = 0; renderGrover(); });
  renderGrover();

  // Three-data-qubit bit-flip code syndrome, shown on computational basis codewords.
  function renderErrorCode() {
    const logical = Number($('logical-bit').value), type = $('error-type').value, location = $('error-location').value;
    const encoded = [logical, logical, logical], damaged = [...encoded];
    if (type === 'X' && location !== 'none') damaged[Number(location)] ^= 1;
    const c01 = damaged[0] ^ damaged[1], c12 = damaged[1] ^ damaged[2];
    const syndrome = `${c01}${c12}`;
    const diagnosis = { '00': 'No X error detected', '10': 'X error on q₀', '11': 'X error on q₁', '01': 'X error on q₂' }[syndrome];
    const corrected = [...damaged];
    if (type === 'X' && location !== 'none') corrected[Number(location)] ^= 1;
    $('encoded-word').textContent = encoded.join(''); $('damaged-word').textContent = damaged.join(''); $('corrected-word').textContent = corrected.join('');
    $('check-01').textContent = c01; $('check-12').textContent = c12; $('syndrome-message').textContent = diagnosis;
    $('error-explain').textContent = type === 'Z' && location !== 'none'
      ? 'A Z error changes relative phase in an encoded superposition, but it leaves this visible basis codeword and both parity checks unchanged. This bit-flip code cannot detect or correct it.'
      : location === 'none' ? 'No error was inserted. Both parity checks agree, so no correction is needed.'
      : `A single X error on q${location} changes the two-check syndrome to ${syndrome}. That pattern identifies the qubit to flip back, provided there was at most one X error.`;
  }
  ['logical-bit','error-type','error-location'].forEach(id => $(id).addEventListener('change', renderErrorCode));
  renderErrorCode();
})();

