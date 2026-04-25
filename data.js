// Shared data: WhatsApp number, menu sections, helpers.

window.RASHKO = window.RASHKO || {};

RASHKO.WHATSAPP_NUMBER = "2348000000000"; // International, digits only

RASHKO.whatsappUrl = function (message) {
  return "https://wa.me/" + RASHKO.WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
};

RASHKO.formatNaira = function (n) {
  return "₦" + n.toLocaleString("en-NG");
};

RASHKO.menuSections = [
  {
    title: "Mezze",
    subtitle: "To Begin",
    items: [
      { name: "Hummus Beiruti", desc: "Whipped chickpeas, tahini, lemon, garlic, olive oil", price: "₦3,500", priceValue: 3500 },
      { name: "Baba Ghanoush", desc: "Smoked aubergine, tahini, pomegranate molasses", price: "₦3,800", priceValue: 3800 },
      { name: "Muhammara", desc: "Roasted red pepper, walnut, Aleppo chili, breadcrumb", price: "₦4,000", priceValue: 4000 },
      { name: "Fattoush", desc: "Sumac, crisp pita, mint, cucumber, tomato", price: "₦4,200", priceValue: 4200 },
      { name: "Tabbouleh", desc: "Bulgur, parsley, tomato, lemon, olive oil", price: "₦3,800", priceValue: 3800 },
      { name: "Warm Pita Basket", desc: "House-baked, with za'atar oil", price: "₦1,500", priceValue: 1500 }
    ]
  },
  {
    title: "From the Coals",
    subtitle: "Charcoal Grill",
    items: [
      { name: "Lamb Kofta Skewers", desc: "Hand-minced, parsley, onion, baharat", price: "₦8,500", priceValue: 8500 },
      { name: "Shish Taouk", desc: "Yogurt-marinated chicken, garlic, lemon, sumac", price: "₦7,200", priceValue: 7200 },
      { name: "Lamb Chops", desc: "Charred over coals, finished with pomegranate", price: "₦14,500", priceValue: 14500 },
      { name: "Mixed Grill", desc: "Kofta, taouk, lamb chop, served with rice", price: "₦16,000", priceValue: 16000 }
    ]
  },
  {
    title: "Slow Cooked",
    subtitle: "Mains",
    items: [
      { name: "Lamb Mandi", desc: "Smoked lamb shank, saffron basmati, almonds, raisins", price: "₦12,500", priceValue: 12500 },
      { name: "Chicken Kabsa", desc: "Spiced rice, raisins, pine nuts, dakkous", price: "₦9,800", priceValue: 9800 },
      { name: "Maqluba", desc: "Inverted lamb & rice with aubergine and cauliflower", price: "₦11,500", priceValue: 11500 },
      { name: "Mansaf", desc: "Lamb in jameed yogurt sauce over rice (for two)", price: "₦22,000", priceValue: 22000 },
      { name: "Whole Sea Bream", desc: "Salt-baked, tahini sauce, charred lemon", price: "₦15,000", priceValue: 15000 }
    ]
  },
  {
    title: "Sweet",
    subtitle: "To Close",
    items: [
      { name: "Kunafa", desc: "Akkawi cheese, kataifi, orange-blossom syrup, pistachio", price: "₦4,500", priceValue: 4500 },
      { name: "Baklava Selection", desc: "Pistachio, walnut, almond — three pieces", price: "₦3,800", priceValue: 3800 },
      { name: "Muhalabia", desc: "Rose milk pudding, slivered pistachio, dried rose", price: "₦3,200", priceValue: 3200 },
      { name: "Arabic Coffee & Dates", desc: "Cardamom-spiced, with medjool dates", price: "₦2,500", priceValue: 2500 }
    ]
  }
];

RASHKO.reviews = [
  { name: "Adamchat", when: "2 months ago", rating: 5, text: "The best Restaurant in Kano. The food, the service, the atmosphere — all five stars. We will be back many times." },
  { name: "Sely Noor", when: "2 months ago", rating: 5, text: "Very good restaurant. Beautifully presented food and incredibly attentive service. The lamb mandi melted in our mouths." },
  { name: "محمد الحامد", when: "2 months ago", rating: 5, text: "Delicious and healthy Arabic food. Felt like a real home-cooked meal in Sana'a. The mezze plate alone is worth the visit." },
  { name: "Aisha Bello", when: "3 months ago", rating: 5, text: "We hosted a family dinner here and the staff went above and beyond. The mansaf was extraordinary — generous portions, deep flavour." },
  { name: "Yusuf Idris", when: "1 month ago", rating: 4, text: "Lovely room, very warm lighting, and the kunafa is dangerous. Will be back for the kabsa." },
  { name: "Fatima A.", when: "5 weeks ago", rating: 5, text: "Authentic Arabic flavours done right. The hummus and warm pita kept arriving — we were spoiled." }
];

// Inline SVG icon library (lucide-style)
RASHKO.icons = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  utensils: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8"/><path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7"/><path d="m2.1 21.8 6.4-6.3"/><path d="m19 5-7 7"/></svg>',
  bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/></svg>',
  bike: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',
  minus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.04 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.889-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.887 9.884zm8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.49-8.413z"/></svg>'
};
