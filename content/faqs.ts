import type { Faq } from '@/content/faq-types'

/**
 * Homepage FAQs, six, phrased the way homeowners actually type them.
 *
 * Every answer here is either a general fact about tree work, a statement about
 * how Crews operates that traces to seo/FACTS.md, or an honest "it depends, and
 * here is what it depends on". No prices. No invented credentials.
 */
export const HOME_FAQS: Faq[] = [
  {
    question: 'How much does tree removal cost?',
    answer:
      'There is no flat rate, and anyone who quotes you one over the phone is guessing. Price comes down to the size of the tree, how close it is to a house, wires or a fence, whether a truck can get near it, and whether you want the stump ground and what you want done with the wood. That is why the estimate is free and done in person, we would rather look at the tree than guess at it.',
  },
  {
    question: 'Do I need a permit to remove a tree in Battle Creek?',
    answer:
      'For a tree on your own property, most Michigan cities do not require one. It changes if the tree sits in the road right-of-way, on a shared line, or under a local ordinance, so check with your city before the day of the work. If it looks to us like a permit applies, we will say so rather than let you find out afterward.',
  },
  {
    question: 'What if the tree is near power lines?',
    answer:
      'Stay well clear of it and do not try to cut anything yourself. The line itself is the utility’s to handle. Call your electric utility and they will deal with the conductor. We work around wires regularly and will tell you honestly on the estimate whether the job needs the utility involved first.',
  },
  {
    question: 'What happens to the wood and brush?',
    answer:
      'That is your call, and it is one of the things we settle on the estimate. Some people want it gone, others want the trunk cut to firewood length and left stacked. Tell us which before we start so it is priced properly. Either way the work area gets cleared and raked before we leave.',
  },
  {
    question: 'How soon can you come out?',
    answer:
      'Call and we will give you a straight answer for that week rather than a vague one. Turnaround depends on what is already booked and on the weather, which decides more of a tree schedule than most people expect.',
  },
  {
    question: 'Do you charge for the estimate?',
    answer:
      'No. The estimate is free and there is no obligation attached to it. We come out, look at the tree in person, and give you a price.',
  },
  {
    // Rendered ONLY when SITE.insured is true. See content/faq-types.ts.
    question: 'Are you insured?',
    answer:
      'Yes. Ask and we will show you the certificate before any work starts. Michigan does not license tree services, so insurance is the thing worth checking on any company you let near your house.',
    requires: 'insured',
  },
]
