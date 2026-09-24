// A logarithmic tour of lengths. Values are characteristic lengths in metres,
// not claims that every entry is an object with a hard physical edge.
const stops = [
  {
    id:"planck",title:"Planck length",meters:1.616255e-35,display:"1.6 × 10<sup>−35</sup> m",kind:"Derived length scale",chapter:"The quantum frontier",evidence:"DERIVED SCALE",scene:"micro",
    body:"Combine the speed of light, gravity, and quantum mechanics and this length appears. It marks a regime where our current theories may need a quantum theory of gravity. It is not a measured pixel of space or proof that smaller lengths cannot exist.",
    wonder:"Even the proton is roughly twenty powers of ten away. There is a lot of unexplored ruler between them.",
    source:"https://physics.nist.gov/cuu/pdf/all.pdf"
  },
  {
    id:"strings",title:"Hypothetical strings",meters:1e-34,display:"No measured size",kind:"Illustrative placement near the Planck scale",chapter:"The quantum frontier",evidence:"HYPOTHESIS",scene:"micro",speculative:true,
    body:"In string theory, fundamental ingredients are one-dimensional strings whose different vibrations can correspond to different particles. No string has been observed. Their characteristic length is model-dependent, so this position on the ruler is an illustration, not a measured stop.",
    wonder:"A guitar string has notes you can hear. A theoretical fundamental string is an idea about the tiniest possible music of matter.",
    source:"https://videos.cern.ch/record/3009401"
  },
  {
    id:"quarks",title:"Quark structure probe",meters:1e-20,display:"10<sup>−20</sup> m",kind:"Scale probed, not a quark diameter",chapter:"The quantum frontier",evidence:"EXPERIMENTAL REACH",scene:"micro",
    body:"CERN's CMS experiment has tested whether quarks reveal smaller constituents down to about this scale. It found no significant departure from the behavior expected of point-like quarks. This is a limit on possible structure, not a measured quark size.",
    wonder:"The microscope here is a particle collision. Higher collision energies reveal finer detail.",
    source:"https://home.cern/cms-looks-deep-inside-quarks/"
  },
  {
    id:"proton",title:"Proton charge radius",meters:8.4075e-16,display:"0.84 femtometres",kind:"Root-mean-square charge radius",chapter:"Matter takes shape",evidence:"MEASURED",scene:"micro",
    body:"The proton's electric charge is spread over a tiny region. Its quoted radius describes that charge distribution, not a little solid billiard ball with a crisp rim.",
    wonder:"A proton is made of quarks and gluons in motion. Its tiny radius hides a very busy interior.",
    source:"https://physics.nist.gov/cuu/pdf/all.pdf"
  },
  {
    id:"atom",title:"Hydrogen atom",meters:1.058e-10,display:"≈ 0.11 nanometres",kind:"Twice the Bohr radius; model reference",chapter:"Matter takes shape",evidence:"MODEL REFERENCE",scene:"micro",
    body:"Twice the Bohr radius gives a familiar length for the simplest atom. The electron is described by a probability cloud, so an atom does not have a hard outer shell at this diameter.",
    wonder:"If the proton were a poppy seed, the atom's cloud would be a surprisingly roomy neighborhood.",
    source:"https://physics.nist.gov/cuu/pdf/all.pdf"
  },
  {
    id:"dna",title:"DNA double helix",meters:2e-9,display:"≈ 2 nanometres",kind:"Width of the helix",chapter:"Life in miniature",evidence:"APPROXIMATE",scene:"micro",
    body:"A DNA double helix is only about two nanometres wide. Its sequence carries information, but the strand has to be folded and packed to fit inside a cell.",
    wonder:"The book of life is written on a ribbon too thin for an ordinary light microscope to resolve directly.",
    source:"https://www.genome.gov/27550069/2012-release-new-nihnhgri-grants-to-harness-nanoscale-technologies-to-cut-dna-sequencing-costs"
  },
  {
    id:"light",title:"Green light wave",meters:5.5e-7,display:"≈ 550 nanometres",kind:"A representative visible wavelength",chapter:"Life in miniature",evidence:"REPRESENTATIVE",scene:"micro",
    body:"A green light wave has peaks spaced roughly 550 nanometres apart. Visible light spans about 380 to 700 nanometres; this stop is a wavelength, not the size of a photon.",
    wonder:"The colors in a rainbow are the same phenomenon with different spacing between wave crests.",
    source:"https://science.nasa.gov/ems/09_visiblelight/"
  },
  {
    id:"blood",title:"Red blood cell",meters:8e-6,display:"≈ 8 micrometres",kind:"Typical diameter",chapter:"Life in miniature",evidence:"APPROXIMATE",scene:"micro",
    body:"A human red blood cell is a flexible, indented disc about 7–8 micrometres across. Its shape helps it move through narrow capillaries while carrying oxygen.",
    wonder:"A parade of more than a hundred could line up across a millimetre.",
    source:"https://pmc.ncbi.nlm.nih.gov/articles/PMC12499939/"
  },
  {
    id:"sand",title:"Grain of sand",meters:5e-4,display:"≈ 0.5 millimetres",kind:"Example of medium sand",chapter:"Our familiar world",evidence:"EXAMPLE",scene:"solar",
    body:"Sand grains cover a range of sizes. This half-millimetre grain sits at the upper end of the medium-sand category used by the U.S. Geological Survey.",
    wonder:"After atoms and cells, one ordinary grain suddenly feels like a boulder.",
    source:"https://apps.usgs.gov/thesaurus/term-simple.php?code=SC-289&thcode=62"
  },
  {
    id:"metre",title:"One-metre ruler",meters:1,display:"1 metre",kind:"SI unit of length",chapter:"Our familiar world",evidence:"DEFINED UNIT",scene:"solar",
    body:"Here is a human-scale pause. The metre is defined using the speed of light in vacuum, not an old metal bar kept in a vault.",
    wonder:"Light crosses one metre in about 3.3 nanoseconds. It will need more than eight minutes to reach us from the Sun.",
    source:"https://www.nist.gov/si-redefinition/meter"
  },
  {
    id:"karman",title:"Kármán line",meters:1e5,display:"100 kilometres",kind:"Altitude above sea level",chapter:"Our familiar world",evidence:"CONVENTION",scene:"solar",
    body:"This commonly used line marks where space begins for many aerospace purposes. Earth's atmosphere thins gradually; there is no sudden glass ceiling at exactly 100 kilometres.",
    wonder:"On a classroom globe one metre wide, this altitude would be less than a centimetre above the surface.",
    source:"https://www.jpl.nasa.gov/edu/resources/lesson-plan/how-far-away-is-space/"
  },
  {
    id:"earth",title:"Planet Earth",meters:1.2756e7,display:"12,756 kilometres",kind:"Equatorial diameter",chapter:"Our cosmic address",evidence:"MEASURED",scene:"solar",
    body:"Earth's equatorial diameter is about 12,756 kilometres. This blue world is already vast beside a person, but it soon becomes the smallest marker in the picture.",
    wonder:"About 30 Earth diameters fit between Earth and the Moon at their average separation.",
    source:"https://science.nasa.gov/earth/facts/"
  },
  {
    id:"moon",title:"Earth to Moon",meters:3.844e8,display:"384,400 kilometres",kind:"Average centre-to-centre distance",chapter:"Our cosmic address",evidence:"AVERAGE",scene:"solar",
    body:"The Moon is, on average, 384,400 kilometres from Earth. The distance changes as it orbits, so this is a useful average rather than a fixed gap.",
    wonder:"The emptiness between two familiar worlds is large enough to line up about 30 Earths.",
    source:"https://science.nasa.gov/earth/facts/"
  },
  {
    id:"sun",title:"The Sun",meters:1.391e9,display:"≈ 1.39 million kilometres",kind:"Approximate diameter",chapter:"Our cosmic address",evidence:"APPROXIMATE",scene:"solar",
    body:"Our star is roughly 109 Earths wide. It supplies the light and warmth that makes Earth's surface livable.",
    wonder:"Our nearest star can feel enormous until you notice how much empty space surrounds it.",
    source:"https://nightsky.jpl.nasa.gov/media/documents/resources/SolSysWorldSizes1.pdf"
  },
  {
    id:"au",title:"Earth to Sun",meters:1.495978707e11,display:"1 astronomical unit",kind:"Defined length; close to the average orbital distance",chapter:"Across the Solar System",evidence:"DEFINED UNIT",scene:"solar",
    body:"One astronomical unit is exactly 149,597,870,700 metres. It is close to Earth's average distance from the Sun and makes the planets' orbits easier to compare.",
    wonder:"Sunlight takes a little over eight minutes to travel this far.",
    source:"https://science.nasa.gov/earth/facts/"
  },
  {
    id:"neptune",title:"Neptune's orbit",meters:4.49e12,display:"≈ 30 AU",kind:"Average distance from the Sun",chapter:"Across the Solar System",evidence:"APPROXIMATE",scene:"solar",
    body:"Neptune, the most distant major planet, orbits about 30 times farther from the Sun than Earth does. The Solar System continues well beyond the planets.",
    wonder:"A ray of sunlight needs around four hours to make it from the Sun to Neptune's orbit.",
    source:"https://science.nasa.gov/solar-system/oort-cloud/facts/"
  },
  {
    id:"heliopause",title:"The heliopause",meters:1.8e13,display:"≈ 120 AU",kind:"Distance from the Sun; varies by direction and time",chapter:"Across the Solar System",evidence:"OBSERVED BOUNDARY",scene:"solar",
    body:"The Sun blows a bubble of charged particles into interstellar space. Voyager 2 crossed the heliopause near 120 AU, where that solar wind gives way to interstellar plasma.",
    wonder:"Crossing this edge means leaving the Sun's plasma bubble, not escaping the Sun's gravity.",
    source:"https://www.nasa.gov/solar-system/the-voyage-to-interstellar-space/"
  },
  {
    id:"oort",title:"Outer Oort Cloud",meters:1.496e16,display:"Up to ≈ 100,000 AU",kind:"Possible distance from the Sun",chapter:"Between the stars",evidence:"HYPOTHETICAL",scene:"cosmic",
    body:"The Oort Cloud is a proposed distant reservoir of icy bodies. Its outer edge may reach roughly 10,000–100,000 AU from the Sun. We infer it from long-period comets; the cloud itself has not been directly imaged.",
    wonder:"A traveller can cross the heliopause and still be deep inside the Sun's wider gravitational neighborhood.",
    source:"https://science.nasa.gov/solar-system/oort-cloud/facts/"
  },
  {
    id:"proxima",title:"Proxima Centauri",meters:4.01e16,display:"4.24 light-years",kind:"Distance from the Sun to the nearest star",chapter:"Between the stars",evidence:"APPROXIMATE",scene:"cosmic",
    body:"Proxima Centauri is the Sun's nearest stellar neighbour, part of the Alpha Centauri system. Even light needs more than four years for the crossing.",
    wonder:"The nearest star is farther away than the outer reaches of the Solar System by a large margin.",
    source:"https://science.nasa.gov/sun/facts/"
  },
  {
    id:"milky",title:"The Milky Way",meters:9.46e20,display:"≈ 100,000 light-years",kind:"Approximate stellar-disc diameter",chapter:"Galaxies & the web",evidence:"APPROXIMATE",scene:"cosmic",
    body:"The galaxy holding our Sun is about 100,000 light-years across. Its visible disc does not have a clean, painted-on edge, and its dark-matter halo reaches farther.",
    wonder:"A beam of light could visit the nearest star in a few years, then spend about 100,000 more crossing this galactic disc.",
    source:"https://science.nasa.gov/universe/exoplanets/our-milky-way-galaxy-how-big-is-space/"
  },
  {
    id:"local",title:"The Local Group",meters:9.46e22,display:"≈ 10 million light-years",kind:"Approximate diameter of our galaxy group",chapter:"Galaxies & the web",evidence:"APPROXIMATE",scene:"cosmic",
    body:"The Milky Way, Andromeda, and smaller neighbours form a gravitationally linked galaxy group around ten million light-years across.",
    wonder:"Our whole galaxy is a neighbourhood inside a much bigger neighbourhood.",
    source:"https://science.nasa.gov/wp-content/uploads/2024/08/7page43.pdf"
  },
  {
    id:"wall",title:"Sloan Great Wall",meters:1.296e25,display:"≈ 1.37 billion light-years",kind:"Length of a mapped galaxy structure",chapter:"Galaxies & the web",evidence:"RESEARCH ESTIMATE",scene:"cosmic",
    body:"Galaxy surveys reveal enormous walls and filaments separated by voids. The Sloan Great Wall was measured at about 1.37 billion light-years long in a published map; the cosmic web has no single rigid edge.",
    wonder:"At this scale, entire galaxies become flecks in a sprawling pattern.",
    source:"https://arxiv.org/abs/astro-ph/0310571"
  },
  {
    id:"observable",title:"Observable universe",meters:8.7e26,display:"≈ 92 billion light-years",kind:"Present-day diameter of the observable region",chapter:"The horizon",evidence:"COSMOLOGICAL ESTIMATE",scene:"cosmic",
    body:"This is the region from which information could have reached us since the early universe. It is about 92 billion light-years across today because space expanded while light travelled. It is not the size of the entire universe.",
    wonder:"The farthest light has travelled for about 13.8 billion years, yet the region it maps is much wider than 13.8 billion light-years.",
    source:"https://www.nasa.gov/science-research/astrophysics/how-big-is-space-we-asked-a-nasa-expert-episode-61/"
  }
];

const minLog=Math.log10(stops[0].meters), maxLog=Math.log10(stops[stops.length-1].meters);
const chapters=[...new Set(stops.map(stop=>stop.chapter))];
const $=id=>document.getElementById(id);
const pageTop=()=>document.getElementById("explorer").scrollIntoView({behavior:"smooth",block:"start"});
let active=0;

function nearestIndex(logValue){
  let answer=0, best=Infinity;
  stops.forEach((stop,index)=>{
    const d=Math.abs(Math.log10(stop.meters)-logValue);
    if(d<best){best=d;answer=index;}
  });
  return answer;
}
function exponentMarkup(value){
  const exponent=Math.floor(value);
  const coefficient=10**(value-exponent);
  return coefficient.toFixed(1)+" × 10<sup>"+String(exponent).replace("-","−")+"</sup> m";
}
function ratioMarkup(ratio){
  if(ratio<1000)return new Intl.NumberFormat("en",{maximumSignificantDigits:3}).format(ratio)+"×";
  const exp=Math.floor(Math.log10(ratio));
  const coefficient=ratio/10**exp;
  return coefficient.toFixed(1)+" × 10<sup>"+exp+"</sup>×";
}
function pct(metres){return (Math.log10(metres)-minLog)/(maxLog-minLog)*100;}
function jump(index,scroll,preserveSlider=false){
  active=Math.max(0,Math.min(stops.length-1,index));
  const s=stops[active];
  const shownLog=preserveSlider?Number($("scale-range").value):Math.log10(s.meters);
  $("story-index").textContent=String(active+1).padStart(2,"0")+" / "+stops.length;
  $("stop-indicator").textContent=String(active+1).padStart(2,"0")+" / "+stops.length;
  $("story-evidence").textContent=s.evidence;
  $("story-overline").textContent=s.chapter;
  $("story-title").textContent=s.title;
  $("story-measure").innerHTML=s.display;
  $("measure-kind").textContent=s.kind;
  $("story-body").textContent=s.body;
  $("story-wonder").textContent=s.wonder;
  $("story-source").href=s.source;
  $("story-jump").textContent=active===stops.length-1?"The journey continues beyond our view.":"Next stop: "+stops[active+1].title;
  $("scene-chapter").textContent=String(chapters.indexOf(s.chapter)+1).padStart(2,"0")+" / "+s.chapter.toUpperCase();
  $("art-number").innerHTML=exponentMarkup(shownLog);
  $("art-caption").textContent=s.speculative?"A theory, not a sighting.":s.id==="observable"?"The view ends. Space might not.":"Keep zooming out.";
  $("ruler-reading").innerHTML=exponentMarkup(shownLog);
  if(!preserveSlider)$("scale-range").value=Math.log10(s.meters).toFixed(4);
  $("prev-stop").disabled=active===0;
  $("next-stop").disabled=active===stops.length-1;
  document.querySelectorAll(".scene-image").forEach(img=>img.classList.toggle("is-active",img.dataset.scene===s.scene));
  document.querySelectorAll(".stop-strip button").forEach((button,index)=>{
    button.classList.toggle("is-active",index===active);
    button.setAttribute("aria-current",index===active?"true":"false");
  });
  document.querySelectorAll(".chapter-jumps button").forEach(button=>button.classList.toggle("is-active",button.dataset.chapter===s.chapter));
  if(scroll)pageTop();
}

const ticks=$("ruler-ticks");
for(let power=-30;power<=25;power+=5){
  const tick=document.createElement("i");
  tick.className=power%10===0?"major":"";
  tick.style.left=((power-minLog)/(maxLog-minLog)*100)+"%";
  ticks.appendChild(tick);
}
const stopStrip=$("stop-strip");
stops.forEach((stop,index)=>{
  const button=document.createElement("button");
  button.type="button";
  button.textContent=String(index+1).padStart(2,"0")+" "+stop.title;
  button.addEventListener("click",()=>jump(index,false));
  stopStrip.appendChild(button);
});
const chapterJumps=$("chapter-jumps");
chapters.forEach(chapter=>{
  const button=document.createElement("button");
  button.type="button";
  button.textContent=chapter;
  button.dataset.chapter=chapter;
  button.addEventListener("click",()=>jump(stops.findIndex(stop=>stop.chapter===chapter),false));
  chapterJumps.appendChild(button);
});
$("prev-stop").addEventListener("click",()=>jump(active-1,false));
$("next-stop").addEventListener("click",()=>jump(active+1,false));
$("scale-range").addEventListener("input",event=>jump(nearestIndex(Number(event.target.value)),false,true));
$("scale-range").addEventListener("keydown",event=>{
  if(event.key==="ArrowRight"||event.key==="ArrowUp"){event.preventDefault();jump(active+1,false);}
  if(event.key==="ArrowLeft"||event.key==="ArrowDown"){event.preventDefault();jump(active-1,false);}
});
document.addEventListener("keydown",event=>{
  const target=event.target;
  if(["INPUT","SELECT","TEXTAREA","BUTTON"].includes(target.tagName))return;
  if(event.key==="ArrowRight"){event.preventDefault();jump(active+1,false);}
  if(event.key==="ArrowLeft"){event.preventDefault();jump(active-1,false);}
});
document.querySelectorAll(".boundary-card").forEach(button=>button.addEventListener("click",()=>jump(stops.findIndex(stop=>stop.id===button.dataset.stop),true)));

const comparisonStops=stops.filter(stop=>!stop.speculative);
const selectA=$("compare-a"),selectB=$("compare-b");
comparisonStops.forEach(stop=>{
  const optionA=document.createElement("option"),optionB=document.createElement("option");
  optionA.value=optionB.value=stop.id;
  optionA.textContent=optionB.textContent=stop.title;
  selectA.appendChild(optionA);selectB.appendChild(optionB);
});
selectA.value="blood";selectB.value="earth";
function compare(){
  const a=stops.find(stop=>stop.id===selectA.value),b=stops.find(stop=>stop.id===selectB.value);
  $("compare-dot-a").style.left=pct(a.meters)+"%";
  $("compare-dot-b").style.left=pct(b.meters)+"%";
  if(a.id===b.id){
    $("compare-heading").textContent="Same stop selected";
    $("compare-number").textContent="1×";
    $("compare-copy").textContent="Choose another stop to see a jump across the ruler.";
    return;
  }
  const larger=a.meters>b.meters?a:b,smaller=a.meters>b.meters?b:a;
  $("compare-heading").textContent=larger.title+" compared with "+smaller.title;
  $("compare-number").innerHTML=ratioMarkup(larger.meters/smaller.meters);
  $("compare-copy").textContent="Comparing their listed lengths. Read each stop's measurement type for context.";
}
selectA.addEventListener("change",compare);selectB.addEventListener("change",compare);
compare();jump(0,false);
