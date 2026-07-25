/*
  ================================
  EDIT THIS FILE FOR EACH PERSON.
  Nothing else in the project needs to change.
  ================================
*/

const CONFIG = {
  // Shown in the welcome + card headings
  name: "Nimo",

  // card.html — the message under the heading
  cardMessage: "Another year of moments only you could have lived.",

  // wishes.html — four wish cards. label = title shown on the card face.
  // detail = the message revealed when it's tapped.
  wishes: [
    {
      label: "Gift",
      detail: "You give more than you take, and today it's your turn to receive.",
      icon: "gift"
    },
    {
      label: "Dream",
      detail: "May whatever you're quietly hoping for find its way to you.",
      icon: "star"
    },
    {
      label: "Love",
      detail: "You are cared for more than you probably know.",
      icon: "heart"
    },
    {
      label: "Joy",
      detail: "Here's to more good, ordinary days — those are the ones that add up.",
      icon: "rose"
    }
  ],

  // gift.html — revealed once the gift is opened
  giftMessage: "This isn't the gift. The gift is that someone thought of you today.",

  // final.html — message under the cake
  finalMessage: "May this year surprise you in the most beautiful, unhurried ways.",

  // ending.html — the very last line, no button after this
  closingLine: "Whatever this year brings, I hope you meet it feeling loved.",

  // Number of candles on the cake (final.html)
  candles: 5
};

/*
  Page order — used to build the side nav dots and to know
  what "the next page" is. Only touch this if you rename files.
*/
const PAGES = [
  { id: "welcome", file: "index.html", label: "Welcome" },
  { id: "card", file: "card.html", label: "Card" },
  { id: "wishes", file: "wishes.html", label: "Wishes" },
  { id: "gift", file: "gift.html", label: "Gift" },
  { id: "final", file: "final.html", label: "Final" },
  { id: "ending", file: "ending.html", label: "Ending" }
];
