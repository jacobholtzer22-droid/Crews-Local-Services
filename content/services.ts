import type { Faq } from '@/content/faq-types'
import type { ServiceSlug } from '@/site.config'

/**
 * Full service page content. One object per service — the page component is a
 * dumb renderer, so copy changes happen here and nowhere else.
 *
 * Nothing states a capability Crews has not been shown to perform: removal,
 * trimming and stump grinding come from the Yelp/Yahoo business description,
 * storm cleanup from a listing photo of a fallen tree cleared at a church/daycare.
 * Everything else is either general fact about tree work or how Crews operates
 * per seo/FACTS.md. No prices anywhere — we explain what drives price and push
 * to the free estimate.
 */
export type Service = {
  slug: ServiceSlug
  /** Nav + card label. */
  label: string
  /** Used in H1s and titles: "{noun} in Battle Creek, MI". */
  noun: string
  /** One line on the homepage service card. */
  summary: string
  /**
   * Full <title>, written out per service rather than assembled from a template.
   * A formula that appends "| Crews Local Services" to every noun overflows the
   * ~60-char SERP cutoff on the longer services, and the half that gets truncated
   * is the city — the single most important word on a local page.
   */
  metaTitle: string
  /** Meta description, 140-160 chars. Shared with the page's Service JSON-LD. */
  description: string
  /** Two sentences answering who/what/where. The first thing on the page. */
  intro: string
  /** Body paragraphs after the intro. */
  body: string[]
  whatsIncluded: string[]
  whenYouNeedIt: { heading: string; detail: string }[]
  priceFactors: { heading: string; detail: string }[]
  /** What actually happens on the day of the work. */
  onTheDay: string[]
  faqs: Faq[]
  /** Alt text for the photo slot once a real photo lands in public/photos/. */
  photoAlt: string
}

export const SERVICES: Service[] = [
  // ───────────────────────────────────────────────────────────── TREE REMOVAL
  {
    slug: 'tree-removal',
    label: 'Tree Removal',
    noun: 'Tree Removal',
    summary:
      'Whole trees taken down, including tight spots near wires, fences and roofs.',
    metaTitle: 'Tree Removal in Battle Creek, MI | Crews Local Services',
    description:
      'Tree removal in Battle Creek, MI. Whole trees taken down, including the tight spots near wires, roofs and fences. Free on-site estimates and a cleared work area.',
    intro:
      'We take whole trees down in Battle Creek and the surrounding towns, including the awkward ones sitting close to wires, fences, sheds and rooflines. What happens to the wood is settled on the estimate, which is free and done in person.',
    body: [
      'Most removals start the same way. You call, we come out and look at the tree standing where it actually is, and you get a price before anything gets cut. Nobody can quote a tree honestly from a photo — the things that decide the job are what is underneath it, what is beside it, and whether a truck can get within reach of it, and none of that shows up in a picture.',
      'Where there is room to work, a tree comes down in a few large pieces. Where there is not — a back yard hemmed in by a fence, a trunk leaning over a garage, a maple grown up through a set of overhead wires — it comes down in controlled sections, rigged and lowered rather than dropped. That second kind takes longer and costs more, and it is the reason two trees that look the same size from the road can be very different jobs.',
      'Once the tree is down the site gets cleared. If you want the stump gone as well, that is a separate pass with a grinder and it is easier and cheaper to book at the same time than to call us back for it later.',
    ],
    whatsIncluded: [
      'The tree taken down, in sections where the space calls for it',
      'Rigging and lowering where a straight drop would put something at risk',
      'What happens to the brush, limbs and trunk wood agreed before we start',
      'The work area raked and cleared before we leave',
      'Stump grinding available on the same visit if you want it',
    ],
    whenYouNeedIt: [
      {
        heading: 'The tree is dead or mostly dead',
        detail:
          'Bare branches in mid-summer, bark falling away in sheets, or mushrooms growing at the base. A dead tree does not stay standing politely — it comes apart from the top down, on its own schedule.',
      },
      {
        heading: 'It is leaning, or the ground is lifting',
        detail:
          'A new lean, or soil heaving on the opposite side of the trunk, means the root plate is failing. That one does not wait for a convenient weekend.',
      },
      {
        heading: 'It is too close to the house',
        detail:
          'Trunks growing tight against a foundation, or a canopy sitting over the roof, where trimming is no longer enough to fix the problem.',
      },
      {
        heading: 'Storm damage past saving',
        detail:
          'A split trunk or a tree that has lost most of its crown is usually a removal, not a repair.',
      },
    ],
    priceFactors: [
      {
        heading: 'Size, and species',
        detail:
          'Height and trunk diameter drive most of it. A dense hardwood carries far more weight per foot than a soft-wooded tree of the same height, and weight is what the job is really about.',
      },
      {
        heading: 'What is underneath it',
        detail:
          'An open field is the cheapest tree you will ever have removed. A fence, a shed, a septic field, a pool or a neighbour’s garage under the drop zone all mean rigging instead of felling.',
      },
      {
        heading: 'Access',
        detail:
          'Whether equipment can get to the tree, or whether every piece has to be carried out through a gate by hand.',
      },
      {
        heading: 'Wires',
        detail:
          'Anything grown into or near overhead lines is slower, more careful work, and sometimes needs the utility involved before we start.',
      },
      {
        heading: 'What you want left behind',
        detail:
          'Stump ground or left, and what you want done with the wood — settled before we start rather than after.',
      },
    ],
    onTheDay: [
      'We walk the job with you before anything starts, so you know where we are dropping and where we are working from.',
      'Vehicles get moved off the drive, and anything loose in the drop zone comes out of the way.',
      'The tree comes down. Expect noise, and expect the yard to look worse before it looks better.',
      'Brush and wood are dealt with the way you asked for on the estimate, and the ground gets raked.',
    ],
    faqs: [
      {
        question: 'Can you take out a tree right next to my house?',
        answer:
          'Usually yes. Trees close to a structure come down in sections, rigged and lowered rather than dropped, so nothing lands where it should not. It is slower work than an open-yard removal and the estimate reflects that.',
      },
      {
        question: 'Will you damage my lawn getting the tree out?',
        answer:
          'We work to avoid it, but heavy wood crossing soft ground leaves marks, and after a wet week it leaves more. We will tell you on the estimate if we think ruts are likely rather than surprising you with them.',
      },
      {
        question: 'Do you take the stump out too?',
        answer:
          'Grinding the stump is a separate part of the job and it is cheaper booked at the same time as the removal than as a return visit. Say so on the estimate and we will price both together.',
      },
      {
        question: 'What happens to the wood?',
        answer:
          'That is settled on the estimate rather than assumed. Some people want the wood gone, others want the trunk cut to firewood length and left stacked. Tell us which before we start.',
      },
      {
        question: 'How long does a removal take?',
        answer:
          'A straightforward tree in an open yard is often a few hours. A large one in a tight back yard, coming down in sections over a fence, can take a full day or more. You will get an honest estimate of the time along with the price.',
      },
    ],
    photoAlt:
      'Crews Local Services removing a large tree at a home in Battle Creek, Michigan',
  },

  // ──────────────────────────────────────────────────────────── TREE TRIMMING
  {
    slug: 'tree-trimming',
    label: 'Tree Trimming',
    noun: 'Tree Trimming',
    summary:
      'Deadwood, low limbs and branches over the roof or driveway cut back before they come down on their own.',
    metaTitle: 'Tree Trimming in Battle Creek, MI | Crews Local Services',
    description:
      'Tree trimming in Battle Creek, MI. Deadwood, low limbs and branches over the roof cut back before they fail. Free on-site estimates, full cleanup.',
    intro:
      'We cut back deadwood, low limbs, and branches hanging over roofs and driveways for homeowners in Battle Creek and the towns around it. It is the cheapest tree work you will ever pay for, because it is the work that prevents the expensive kind.',
    body: [
      'Trimming is mostly about deciding what to take and what to leave, and that decision matters more than the cutting does. Removing too much at once stresses a tree and provokes a mess of weak new growth that becomes a bigger problem in five years. So the honest version of this service is that we take out what is dead, what is rubbing, what is hanging over something it should not be, and then we stop.',
      'The usual candidates are dead limbs still held up in the canopy, branches lying on a roof or scraping siding, low growth over the driveway that a truck keeps catching, and limbs that have grown out over a neighbour’s fence. Any of those are worth doing before winter, because a dead limb that survives three storms will find the fourth one.',
      'If we come out and think a tree does not need cutting this year, we will tell you that. It is a shorter conversation than the alternative and it is why people call back.',
    ],
    whatsIncluded: [
      'Deadwood taken out of the canopy',
      'Limbs cleared off roofs, siding and gutters',
      'Low branches raised over driveways and walkways',
      'Growth cut back off fences and property lines',
      'Brush cleared out of the work area and the ground raked',
    ],
    whenYouNeedIt: [
      {
        heading: 'Branches are touching the house',
        detail:
          'Anything resting on a roof wears the shingles, keeps the surface damp, and gives squirrels a bridge straight into your soffit.',
      },
      {
        heading: 'There is deadwood in the canopy',
        detail:
          'Bare grey limbs among the leaves in summer. They are already failed — they just have not fallen yet, and they choose their own moment.',
      },
      {
        heading: 'You cannot get under it',
        detail:
          'Low limbs over the driveway, the walk, or the part of the lawn you have to mow.',
      },
      {
        heading: 'Before storm season, not after',
        detail:
          'Trimming is preventative work. Doing it in spring is cheaper than clearing what a July storm takes down.',
      },
    ],
    priceFactors: [
      {
        heading: 'Height, and how much of it',
        detail:
          'Work at 15 feet off a ladder and work at 50 feet in a canopy are different jobs. How much of the tree needs attention matters as much as how tall it is.',
      },
      {
        heading: 'How much comes out',
        detail:
          'A few dead limbs is a short visit. Lifting an entire canopy off a roofline is most of a day.',
      },
      {
        heading: 'What is underneath',
        detail:
          'Limbs over a roof, a fence or a garden have to be roped and lowered instead of dropped.',
      },
      {
        heading: 'Number of trees',
        detail:
          'Several trees in one visit costs less per tree than calling us out separately for each one.',
      },
    ],
    onTheDay: [
      'We walk the trees with you first and agree what is coming off before any cutting starts.',
      'Anything under the work gets moved — patio furniture, cars, garbage cans.',
      'Cuts are made back to the right point on the branch, not left as stubs.',
      'Brush comes out, gutters get checked for what fell in them, and the ground gets raked.',
    ],
    faqs: [
      {
        question: 'When is the best time of year to trim?',
        answer:
          'Late winter into early spring is ideal for most trees in Michigan — the structure is visible with the leaves off and the tree responds well going into the growing season. Dead and dangerous limbs are the exception: those come out whenever you notice them.',
      },
      {
        question: 'How much can you take off without hurting the tree?',
        answer:
          'Less than most people expect. Taking a large share of a canopy in one go stresses the tree and provokes weak regrowth that becomes a problem later. We take what is dead, rubbing or in the way, and leave the rest.',
      },
      {
        question: 'Can you cut back the branches hanging over my fence?',
        answer:
          'Yes, and this is a common one. You are generally entitled to trim growth that crosses onto your property, but it is worth a conversation with the neighbour first if the trunk is on their side. We will tell you where the line falls before we cut.',
      },
      {
        question: 'Do you top trees?',
        answer:
          'No. Topping — cutting the whole crown back to stubs — is the single most damaging thing you can do to a mature tree. It provokes weak growth that fails later and it takes years off the tree. If someone has offered to top yours, get a second opinion.',
      },
      {
        question: 'Will you clean up the branches?',
        answer:
          'Yes. The brush and limbs get cleared out of the work area and the ground gets raked. Cleanup is part of the job, not an extra.',
      },
    ],
    photoAlt:
      'Crews Local Services trimming limbs back from a roofline in Battle Creek, Michigan',
  },

  // ─────────────────────────────────────────────────────────── STUMP GRINDING
  {
    slug: 'stump-grinding',
    label: 'Stump Grinding',
    noun: 'Stump Grinding',
    summary: 'The leftover stump ground below grade so you can mow straight over it.',
    metaTitle: 'Stump Grinding in Battle Creek, MI | Crews Local Services',
    description:
      'Stump grinding in Battle Creek, MI. Stumps ground below grade so you can mow over them and put grass back. Free estimates, ours or someone else’s stumps.',
    intro:
      'We grind stumps out below ground level in Battle Creek and the surrounding towns, so you can run a mower straight over the spot and put grass back where the tree was. We grind stumps we took down ourselves and stumps somebody else left behind years ago.',
    body: [
      'A stump left in the ground does not quietly disappear. It gets softer rather than smaller, holds water, feeds carpenter ants and wasps, and on some species throws suckers up through the lawn for years afterward. It is also the thing you catch the mower on every single week.',
      'Grinding chews the stump and the top of the root flare down into chips, usually to somewhere between four and eight inches below grade — deeper if you are planning to plant something on top rather than just seed grass. What you are left with is a hole full of wood chips.',
      'Those chips are the part people are not expecting. A stump produces a surprising volume of them, well above the original stump, and they are not soil. They can be raked back into the hole and mounded to settle, which is included. If you would rather they were off the site so you can fill with topsoil, raise it on the estimate — it is quoted separately, and it gives a much better result if you are putting grass back.',
    ],
    whatsIncluded: [
      'Stump ground below grade, deeper if you are replanting',
      'The visible root flare ground down with it',
      'Chips raked back into the hole and mounded to settle',
      'The area left ready for topsoil and seed',
      'Stumps from any tree, whether we removed it or not',
    ],
    whenYouNeedIt: [
      {
        heading: 'You keep hitting it with the mower',
        detail: 'The most common reason, and reason enough on its own.',
      },
      {
        heading: 'It is sprouting',
        detail:
          'Some species keep sending shoots up from the stump and roots for years. Grinding ends that.',
      },
      {
        heading: 'You want to plant or build there',
        detail:
          'Grass, a bed, a shed or a patio all need the stump and the flare out of the way first.',
      },
      {
        heading: 'It is drawing pests',
        detail:
          'A rotting stump close to the house is a good home for carpenter ants, and they do not stay in the stump.',
      },
    ],
    priceFactors: [
      {
        heading: 'Diameter',
        detail:
          'Measured across the stump at ground level, not the tree it came from. This is the main driver.',
      },
      {
        heading: 'Access',
        detail:
          'A grinder has to physically reach the stump. A narrow gate, a steep bank or a fenced back yard all change the job.',
      },
      {
        heading: 'How deep you need it',
        detail:
          'Grinding for grass is shallower than grinding for a patio or a new planting.',
      },
      {
        heading: 'What happens to the chips',
        detail: 'Raking them back and mounding them is included. Anything else is quoted separately.',
      },
      {
        heading: 'What is around it',
        detail:
          'Rocks, buried pipe, irrigation or utilities near the stump mean slower and more careful work.',
      },
    ],
    onTheDay: [
      'Mark anything buried you know about — irrigation lines, dog fence, low-voltage lighting, septic. We cannot see it and the grinder will not care.',
      'The grinder needs a path to the stump, so gates and side yards need to be clear.',
      'Grinding throws debris, so anything nearby that you would rather not get chipped gets moved or covered.',
      'Chips get raked back and mounded, or dealt with the way you agreed on the estimate.',
    ],
    faqs: [
      {
        question: 'How deep do you grind?',
        answer:
          'Usually four to eight inches below grade, which is enough to put grass back and mow over it. If you are planting a tree or laying a patio on the spot, say so and we will go deeper.',
      },
      {
        question: 'What happens to all the wood chips?',
        answer:
          'A stump makes far more chips than people expect — well more than the volume of the stump itself. Raking them back into the hole and mounding them to settle is included. If you would rather they were off the site so you can fill with topsoil, raise it on the estimate and we will quote it separately.',
      },
      {
        question: 'Do the roots get removed too?',
        answer:
          'Grinding takes out the stump and the root flare around it, not the whole root system running out under the lawn. Those roots are already dead and they break down on their own. Digging out an entire root system is a very different and much more expensive job.',
      },
      {
        question: 'Can I plant grass where the stump was?',
        answer:
          'Yes, but not straight into the chips — they are wood, not soil, and grass struggles in them. Have the chips cleared, fill with topsoil, then seed. If you leave the chips, expect the mound to settle over several months before it is ready.',
      },
      {
        question: 'Will you grind a stump you did not cut?',
        answer:
          'Yes. Plenty of what we grind is somebody else’s leftover, sometimes years old. An old stump is often easier than a fresh one.',
      },
    ],
    photoAlt:
      'Crews Local Services grinding a stump below grade at a property in Battle Creek, Michigan',
  },

  // ─────────────────────────────────────────────────────── STORM DAMAGE CLEANUP
  {
    slug: 'storm-damage-cleanup',
    label: 'Storm Cleanup',
    noun: 'Storm Damage Cleanup',
    summary: 'Trees and limbs down after a storm cut up and cleared out of the way.',
    metaTitle: 'Storm Damage Cleanup in Battle Creek, MI | Crews Local',
    description:
      'Storm damage cleanup in Battle Creek, MI. Downed trees and broken limbs cut up and cleared out of the way. Call and we will say honestly how soon we can get there.',
    intro:
      'After a storm we clear downed trees, broken limbs and hangers from properties in Battle Creek and the surrounding towns. Call us and we will give you a straight answer about how soon we can get to you.',
    body: [
      'Storm damage is almost always worse than it looks from the kitchen window. The tree across the lawn is the obvious part. The parts that matter more are the split in the trunk of the one still standing, the broken limb hung up in the canopy above where the kids play, and the trunk lying on a fence with tension in it that will move the moment somebody cuts the wrong side of it.',
      'That last one is why the advice here is to leave it alone. A limb under tension is genuinely dangerous to cut, and a chainsaw is an unforgiving tool for finding that out. It costs nothing to have someone look at it first.',
      'Two things come before us, though. If a power line is down or a tree is touching a line, stay away from it and call your electric utility — the conductor is theirs to make safe and nobody else should be near it. And if a tree is on the house, call your insurer early, because most policies want to hear about it before the repair rather than after.',
    ],
    whatsIncluded: [
      'Downed trees and limbs cut up and cleared',
      'Hangers taken out of the canopy of trees still standing',
      'Trees off fences, sheds, drives and out of yards',
      'Storm-damaged trees assessed for whether they can be saved',
      'Debris cleared out of the work area and the ground raked',
    ],
    whenYouNeedIt: [
      {
        heading: 'A tree or a large limb is down',
        detail: 'Across the yard, the drive, a fence or an outbuilding.',
      },
      {
        heading: 'There is a limb hung up in the canopy',
        detail:
          'A broken limb caught in the branches above is the one that catches people out. It will come down eventually, without warning.',
      },
      {
        heading: 'A trunk is split',
        detail:
          'A split or cracked trunk on a tree still standing is a tree that is not finished falling.',
      },
      {
        heading: 'The whole tree has shifted',
        detail:
          'A new lean after a storm, or soil lifted on one side, means the roots have gone.',
      },
    ],
    priceFactors: [
      {
        heading: 'How much is down',
        detail: 'One limb across a drive against a whole tree through a fence line.',
      },
      {
        heading: 'What it is lying on',
        detail:
          'Wood on the ground is straightforward. Wood on a fence, a roof or a vehicle has to come off in a controlled way.',
      },
      {
        heading: 'Tension in the wood',
        detail:
          'Bent, pinned or partly attached limbs are slow, careful work, and they are the reason cutting it yourself is a bad idea.',
      },
      {
        heading: 'Access after the storm',
        detail: 'Soft ground and blocked drives both make the job longer.',
      },
    ],
    onTheDay: [
      'Keep everyone well clear of anything down until we have looked at it — especially anything near a wire.',
      'We assess what is still standing as well as what is on the ground. The dangerous piece is often the one still up.',
      'Wood gets cut up and cleared, working from the safe end of anything under tension.',
      'Debris is cleared out of the way and the site is raked.',
    ],
    faqs: [
      {
        question: 'How fast can you get here after a storm?',
        answer:
          'Call and we will tell you honestly. After a big storm the whole county calls at once, so we will give you a real answer about where you fall rather than promise something we cannot do.',
      },
      {
        question: 'A tree is on the power line. What do I do?',
        answer:
          'Stay away from it and call your electric utility. A downed or contacted line is theirs to make safe and nobody else should approach it, including us. Once the utility has cleared it we can deal with the tree.',
      },
      {
        question: 'Will my insurance cover this?',
        answer:
          'That is between you and your insurer, and policies differ a lot. Most want to be told before the repair happens rather than after, so call them early. We can give you a written estimate to send them.',
      },
      {
        question: 'Can I just cut it up myself?',
        answer:
          'Storm wood is not normal wood. Limbs land bent, pinned and under tension, and they move fast in an unexpected direction when they are released. If anything is bent, hung up, or lying on something, it is worth having someone look before a saw goes near it.',
      },
      {
        question: 'The tree is still standing but it is split. Can it be saved?',
        answer:
          'Sometimes. It depends where the split is and how much of the trunk it goes through. We will tell you straight whether it is worth keeping or whether you are paying to delay a removal by a year.',
      },
    ],
    photoAlt:
      'Crews Local Services clearing a storm-damaged tree in Battle Creek, Michigan',
  },
]

export const SERVICE_BY_SLUG = Object.fromEntries(
  SERVICES.map((s) => [s.slug, s]),
) as Record<ServiceSlug, Service>
