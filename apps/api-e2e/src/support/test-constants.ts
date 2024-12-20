export const USERS = {
  'VISITOR Sam': {
    token: null,
    id: NaN,
    name: 'Sam',
    email: 'unknown',
    role: 'visitor',
  },
  // Doesn't have attendances or calendars
  'USER Carol': {
    token: '{"name":"Carol Reed", "email":"carol.reed@hotmail.com"}',
    id: 43,
    name: 'Carol Reed',
    email: 'carol.reed@hotmail.com',
    role: 'user',
  },
  'USER Robert': {
    token: '{"name":"Robert Smith", "email":"robert.smith@gmail.com"}',
    id: 16,
    name: 'Robert Smith',
    email: 'robert.smith@gmail.com',
    role: 'user',
  },
  'EDITOR Rachel': {
    token: '{"name":"Rachel Green", "email":"rachel.green@gmail.com"}',
    id: 8,
    name: 'Rachel Green',
    email: 'rachel.green@gmail.com',
    role: 'editor',
  },
  'EDITOR Thomas': {
    token: '{"name":"Thomas Brown", "email":"thomas.brown@gmail.com"}',
    id: 9,
    name: 'Thomas Brown',
    email: 'thomas.brown@gmail.com',
    role: 'editor',
  },
  'ADMIN David': {
    token: '{"name":"David Thompson", "email":"david.thompson@gmail.com"}',
    id: 3,
    name: 'David Thompson',
    email: 'david.thompson@gmail.com',
    role: 'admin',
  },
  'ADMIN EMMA': {
    token: '{"name":"Emma Roberts", "email":"emma.roberts@gmail.com"}',
    id: 4,
    name: 'Emma Roberts',
    email: 'emma.roberts@gmail.com',
    role: 'admin',
  },
};

// prettier-ignore
export const TEST_EVENTS = [
{
id: 5,
title: 'Electronic Music Workshop',
description:
'Hands-on workshop on electronic music production. Learn from professional producers and get familiar with industry-standard equipment.',
location: 'Point Blank Music School, 26 Orsman Road, N1 5QJ',
startAt: '2025-02-15T14:00:00',
endAt: '2025-02-15T17:00:00',
},
{
id: 7,
title: 'Classic Rock Tribute Night',
description:
'Experience the best of 70s and 80s rock with our house band performing classic hits from Led Zeppelin, Pink Floyd, and more.',
location: 'O2 Academy Islington, N1 Centre, 16 Parkfield Street, N1 0PS',
startAt: '2025-03-15T20:00:00',
endAt: '2025-03-15T23:30:00',
},
{
id: 13,
title: 'Summer Rooftop Party',
description:
"Welcome summer with cocktails, BBQ, and DJ sets on one of London's most stunning rooftop venues.",
location: 'Sky Garden, 20 Fenchurch Street, EC3M 8AF',
startAt: '2025-06-15T18:00:00',
endAt: '2025-06-15T23:00:00',
},
{
id: 14,
title: 'Blockchain Developer Meetup',
description:
'Monthly meetup for blockchain developers. Discussion topics include DeFi, NFTs, and emerging blockchain platforms.',
location: "Blockchain Centre London, 1 St Katharine's Way, E1W 1UN",
startAt: '2025-07-01T18:30:00',
endAt: '2025-07-01T21:00:00',
},
{
id: 17,
title: 'Indie Music Showcase',
description:
"Discover emerging indie bands from London's underground music scene. Multiple stages featuring various genres.",
location: 'KOKO, 1A Camden High Street, NW1 7JE',
startAt: '2025-08-15T19:00:00',
endAt: '2025-08-15T23:00:00',
},
{
id: 18,
title: 'Data Science Workshop',
description:
'Practical workshop covering data analysis, visualization, and machine learning basics using Python.',
location: 'General Assembly London, 1 Fore Street, EC2Y 5EJ',
startAt: '2025-09-01T10:00:00',
endAt: '2025-09-01T16:00:00',
},
{
id: 20,
title: 'Autumn Art Exhibition',
description:
'Showcasing works from emerging London artists. Mixed media installations and traditional artwork on display.',
location: "Saatchi Gallery, Duke of York's HQ, King's Road, SW3 4RY",
startAt: '2025-10-01T11:00:00',
endAt: '2025-10-01T18:00:00',
},
{
id: 24,
title: 'Jazz & Blues Evening',
description:
'Intimate evening of jazz and blues featuring renowned London musicians. Special guest performance by international artists.',
location: '606 Club, 90 Lots Road, SW10 0QD',
startAt: '2025-11-15T20:00:00',
endAt: '2025-11-15T23:30:00',
},
{
id: 26,
title: 'Christmas Carol Concert',
description:
'Traditional Christmas carols performed by London Chamber Choir. Festive atmosphere in historic church setting.',
location: 'St Martin-in-the-Fields, Trafalgar Square, WC2N 4JJ',
startAt: '2025-12-15T19:30:00',
endAt: '2025-12-15T21:30:00',
},
{
id: 27,
title: "New Year's Eve Gala",
description:
"Elegant celebration with champagne reception, five-course dinner, and live entertainment. Spectacular views of London's fireworks.",
location: 'The Shard, 32 London Bridge Street, SE1 9SG',
startAt: '2025-12-31T19:00:00',
endAt: '2026-01-01T01:00:00',
},
{
id: 29,
title: 'London Fashion Show',
description:
"Showcase of emerging designers' latest collections. Networking opportunity with fashion industry professionals.",
location: 'Victoria House, Bloomsbury Square, WC1B 4DA',
startAt: '2026-02-01T18:00:00',
endAt: '2026-02-01T22:00:00',
},
{
id: 31,
title: 'Tech Startup Pitch Night',
description:
'Watch 10 promising tech startups pitch their ideas to investors. Networking session with industry experts.',
location: 'Campus London, 4-5 Bonhill Street, EC2A 4BX',
startAt: '2026-03-01T18:00:00',
endAt: '2026-03-01T21:00:00',
},
{
id: 32,
title: 'London Film Festival',
description:
'Screenings of award-winning films from around the world. Q&A sessions with directors and actors.',
location: 'BFI Southbank, Belvedere Road, SE1 8XT',
startAt: '2026-03-15T18:00:00',
endAt: '2026-03-15T23:00:00',
},
{
id: 33,
title: 'Digital Marketing Masterclass',
description:
'Learn advanced digital marketing strategies from industry experts. Topics include SEO, social media, and content marketing.',
location: 'The Trampery Old Street, 239 Old Street, EC1V 9EY',
startAt: '2026-04-01T10:00:00',
endAt: '2026-04-01T16:00:00',
},
{
id: 35,
title: 'Fintech Innovation Summit',
description:
'Leading fintech experts discuss future of digital banking and cryptocurrency',
location: 'Level39, One Canada Square, Canary Wharf, E14 5AB',
startAt: '2026-04-20T09:00:00',
endAt: '2026-04-20T12:00:00',
},
{
id: 38,
title: 'Urban Photography Workshop',
description:
'Learn street photography techniques in historic London locations',
location: 'Somerset House, Strand, WC2R 1LA',
startAt: '2026-05-10T11:00:00',
endAt: '2026-05-10T15:00:00',
},
{
id: 40,
title: 'Chelsea Flower Show',
description:
"World's most prestigious flower show featuring innovative garden designs",
location: 'Royal Hospital Chelsea, Royal Hospital Road, SW3 4SR',
startAt: '2026-05-20T09:00:00',
endAt: '2026-05-20T11:00:00',
},
{
id: 41,
title: 'Cheese and Wine Festival',
description: 'Artisanal cheese and wine tasting with expert sommeliers',
location: 'Borough Market, 8 Southwark St, SE1 1TL',
startAt: '2026-05-25T12:00:00',
endAt: '2026-05-25T18:00:00',
},
{
id: 45,
title: 'Wimbledon Tennis Finals',
description:
'Live screening of Wimbledon finals with strawberries and cream',
location: "Duke of York Square, King's Road, SW3 4LY",
startAt: '2026-07-05T13:00:00',
endAt: '2026-07-05T18:00:00',
},
{
id: 47,
title: 'Street Food Festival',
description: "International cuisine from London's best street food vendors",
location: 'Spitalfields Market, 56 Brushfield St, E1 6AA',
startAt: '2026-07-15T11:00:00',
endAt: '2026-07-15T15:00:00',
},
{
id: 48,
title: 'Blockchain Development Workshop',
description: 'Hands-on workshop on building decentralized applications',
location: 'Plexal, Here East, Queen Elizabeth Olympic Park, E20 3BS',
startAt: '2026-07-20T10:00:00',
endAt: '2026-07-20T16:00:00',
},
{
id: 51,
title: 'React & Next.js Community Meetup',
description:
'Deep dive into React 19 features and Next.js App Router best practices. Live coding sessions, networking, and pizza! Perfect for both beginners and experienced developers.',
location: 'Skills Matter, 10 South Place, EC2M 7EB',
startAt: '2024-12-27T18:30:00',
endAt: '2024-12-27T21:00:00',
},
{
id: 55,
title: 'AI & Machine Learning Workshop',
description:
'Hands-on workshop covering latest developments in AI. Practice with real-world datasets and learn from industry experts.',
location: 'Imperial College London, Exhibition Rd, SW7 2AZ',
startAt: '2025-01-03T09:00:00',
endAt: '2025-01-03T12:00:00',
},
{
id: 59,
title: 'TypeScript Advanced Patterns',
description:
'Master TypeScript with advanced type system features, decorators, and real-world architectural patterns. Bring your laptop!',
location: 'CodeNode, 10 South Place, EC2M 7EB',
startAt: '2025-01-12T10:00:00',
endAt: '2025-01-12T16:00:00',
},
{
id: 60,
title: 'London Art Gallery Evening',
description:
'Exhibition opening featuring contemporary British artists. Wine reception and artist talks included.',
location: "Saatchi Gallery, Duke of York's HQ, SW3 4RY",
startAt: '2025-01-15T18:00:00',
endAt: '2025-01-15T21:00:00',
},
{
id: 62,
title: 'London Fashion Week Preview',
description:
'Exclusive preview of upcoming collections from emerging British designers. Includes runway show and meeting with designers.',
location: 'Victoria House, Bloomsbury Square, WC1B 4DA',
startAt: '2025-01-20T19:00:00',
endAt: '2025-01-20T22:00:00',
},
{
id: 64,
title: 'London Wine Tasting Evening',
description:
'Sample premium wines from around the world. Expert sommeliers guide you through exclusive vintages. Cheese pairing included.',
location: "Berry Bros. & Rudd, 3 St James's St, SW1A 1EG",
startAt: '2025-01-25T19:00:00',
endAt: '2025-01-25T22:00:00',
},
{
id: 70,
title: "Valentine's Classical Concert",
description:
"Romantic classics performed by the Royal Philharmonic Orchestra. Programme includes Tchaikovsky's Romeo and Juliet.",
location: 'Royal Albert Hall, Kensington Gore, SW7 2AP',
startAt: '2025-02-14T19:30:00',
endAt: '2025-02-14T22:00:00',
},
{
id: 71,
title: 'React & Next.js Community Meetup',
description:
'Deep dive into React 19 features and Next.js App Router best practices. Live coding sessions, networking, and pizza! Perfect for both beginners and experienced developers.',
location: 'Skills Matter, 10 South Place, EC2M 7EB',
startAt: '2025-09-27T17:30:00',
endAt: '2025-09-27T20:00:00',
},
{
id: 72,
title: 'West End Musical Night',
description:
'Spectacular evening featuring songs from Les Misérables, Phantom of the Opera, and other beloved musicals. Special guest performances from current West End stars.',
location: 'Prince Edward Theatre, Old Compton St, W1D 4HS',
startAt: '2025-10-28T19:30:00',
endAt: '2025-10-28T22:30:00',
},
{
id: 73,
title: 'London Tech Startup Pitch Night',
description:
"10 promising startups pitch to top VCs and angel investors. Networking opportunity with London's tech ecosystem leaders.",
location: 'TechHub London, 20 Ropemaker St, EC2Y 9AR',
startAt: '2025-05-30T16:00:00',
endAt: '2025-05-30T19:00:00',
},
{
id: 74,
title: "New Year's Eve Jazz Spectacular",
description:
"Ring in 2025 with London's finest jazz ensemble. Champagne reception, live performances, and dancing until dawn. Black tie event.",
location: "Ronnie Scott's Jazz Club, 47 Frith St, W1D 4HT",
startAt: '2025-12-31T21:00:00',
endAt: '2025-12-31T23:00:00',
},
{
id: 76,
title: 'London Symphony: Winter Classics',
description:
"An evening of Tchaikovsky, featuring The Nutcracker Suite and Symphony No. 1 'Winter Dreams'. Guest conductor Michael Thompson.",
location: 'Barbican Centre, Silk St, EC2Y 8DS',
startAt: '2025-07-05T18:00:00',
endAt: '2025-07-05T20:30:00',
},
{
id: 77,
title: 'Digital Marketing Summit 2025',
description:
'Latest trends in SEO, social media, and content marketing. Keynotes from Google, Meta, and leading digital agencies. Interactive workshops included.',
location: 'QEII Centre, Broad Sanctuary, SW1P 3EE',
startAt: '2025-09-08T07:30:00',
endAt: '2025-09-08T08:30:00',
},
{
id: 82,
title: 'London Fashion Week Preview',
description:
'Exclusive preview of upcoming collections from emerging British designers. Includes runway show and meeting with designers.',
location: 'Victoria House, Bloomsbury Square, WC1B 4DA',
startAt: '2025-03-20T19:00:00',
endAt: '2025-03-20T22:00:00',
},
{
id: 84,
title: 'London Wine Tasting Evening',
description:
'Sample premium wines from around the world. Expert sommeliers guide you through exclusive vintages. Cheese pairing included.',
location: "Berry Bros. & Rudd, 3 St James's St, SW1A 1EG",
startAt: '2025-11-25T19:00:00',
endAt: '2025-11-25T22:00:00',
},
{
id: 86,
title: 'Classical Piano Recital',
description:
'Award-winning pianist performs Chopin, Liszt, and Rachmaninoff. Intimate venue, premium acoustics.',
location: 'Wigmore Hall, 36 Wigmore St, W1U 2BP',
startAt: '2025-09-30T18:30:00',
endAt: '2025-09-30T20:30:00',
},
{
id: 87,
title: 'Data Science Career Fair',
description:
'Meet leading employers in data science and analytics. On-site interviews and resume workshops available.',
location: 'Business Design Centre, 52 Upper St, N1 0QH',
startAt: '2025-06-02T09:00:00',
endAt: '2025-06-02T15:00:00',
},
{
id: 90,
title: "Valentine's Classical Concert",
description:
"Romantic classics performed by the Royal Philharmonic Orchestra. Programme includes Tchaikovsky's Romeo and Juliet.",
location: 'Royal Albert Hall, Kensington Gore, SW7 2AP',
startAt: '2025-07-14T18:30:00',
endAt: '2025-07-14T21:00:00',
},
{
id: 95,
title: 'React & Next.js Community Meetup',
description:
'Deep dive into React 19 features and Next.js App Router best practices. Live coding sessions, networking, and pizza! Perfect for both beginners and experienced developers.',
location: 'Skills Matter, 10 South Place, EC2M 7EB',
startAt: '2025-05-27T17:30:00',
endAt: '2025-05-27T20:00:00',
},
{
id: 96,
title: 'West End Musical Night',
description:
'Spectacular evening featuring songs from Les Misérables, Phantom of the Opera, and other beloved musicals. Special guest performances from current West End stars.',
location: 'Prince Edward Theatre, Old Compton St, W1D 4HS',
startAt: '2025-10-28T19:30:00',
endAt: '2025-10-28T22:30:00',
},
];

// prettier-ignore
export const TEST_RELATIONS = [
{
userId: 16,
eventId: 18,
attendance: 'attending',
calendar: 'removed',
},
{
userId: 4,
eventId: 96,
attendance: 'declined',
calendar: 'removed',
},
{
userId: 8,
eventId: 77,
attendance: 'declined',
calendar: 'unset',
},
{
userId: 9,
eventId: 24,
attendance: 'attending',
calendar: 'added',
},
{
userId: 8,
eventId: 72,
attendance: 'declined',
calendar: 'unset',
},
{
userId: 8,
eventId: 86,
attendance: 'attending',
calendar: 'unset',
},
{
userId: 4,
eventId: 40,
attendance: 'attending',
calendar: 'added',
},
{
userId: 16,
eventId: 48,
attendance: 'attending',
calendar: 'added',
},
{
userId: 3,
eventId: 82,
attendance: 'attending',
calendar: 'added',
},
{
userId: 9,
eventId: 14,
attendance: 'attending',
calendar: 'unset',
},
{
userId: 9,
eventId: 90,
attendance: 'declined',
calendar: 'unset',
},
{
userId: 4,
eventId: 90,
attendance: 'attending',
calendar: 'unset',
},
{
userId: 3,
eventId: 74,
attendance: 'attending',
calendar: 'removed',
},
{
userId: 4,
eventId: 41,
attendance: 'attending',
calendar: 'added',
},
{
userId: 3,
eventId: 27,
attendance: 'unset',
calendar: 'unset',
},
{
userId: 16,
eventId: 77,
attendance: 'attending',
calendar: 'unset',
},
{
userId: 3,
eventId: 64,
attendance: 'declined',
calendar: 'unset',
},
{
userId: 4,
eventId: 73,
attendance: 'attending',
calendar: 'added',
},
{
userId: 9,
eventId: 45,
attendance: 'attending',
calendar: 'added',
},
{
userId: 16,
eventId: 47,
attendance: 'unset',
calendar: 'unset',
},
{
userId: 16,
eventId: 5,
attendance: 'attending',
calendar: 'added',
},
{
userId: 3,
eventId: 13,
attendance: 'attending',
calendar: 'removed',
},
{
userId: 3,
eventId: 20,
attendance: 'attending',
calendar: 'removed',
},
{
userId: 4,
eventId: 38,
attendance: 'declined',
calendar: 'removed',
},
{
userId: 3,
eventId: 33,
attendance: 'attending',
calendar: 'added',
},
{
userId: 8,
eventId: 33,
attendance: 'unset',
calendar: 'unset',
},
{
userId: 3,
eventId: 87,
attendance: 'unset',
calendar: 'unset',
},
{
userId: 4,
eventId: 70,
attendance: 'attending',
calendar: 'removed',
},
{
userId: 16,
eventId: 76,
attendance: 'declined',
calendar: 'removed',
},
{
userId: 9,
eventId: 60,
attendance: 'attending',
calendar: 'removed',
},
{
userId: 3,
eventId: 84,
attendance: 'attending',
calendar: 'unset',
},
{
userId: 4,
eventId: 7,
attendance: 'declined',
calendar: 'unset',
},
{
userId: 3,
eventId: 95,
attendance: 'attending',
calendar: 'removed',
},
{
userId: 9,
eventId: 59,
attendance: 'unset',
calendar: 'unset',
},
{
userId: 8,
eventId: 55,
attendance: 'attending',
calendar: 'added',
},
{
userId: 8,
eventId: 18,
attendance: 'attending',
calendar: 'removed',
},
{
userId: 16,
eventId: 71,
attendance: 'attending',
calendar: 'added',
},
{
userId: 16,
eventId: 33,
attendance: 'attending',
calendar: 'added',
},
{
userId: 8,
eventId: 73,
attendance: 'attending',
calendar: 'removed',
},
{
userId: 16,
eventId: 62,
attendance: 'unset',
calendar: 'unset',
},
{
userId: 4,
eventId: 26,
attendance: 'attending',
calendar: 'added',
},
{
userId: 4,
eventId: 74,
attendance: 'attending',
calendar: 'added',
},
{
userId: 3,
eventId: 29,
attendance: 'attending',
calendar: 'added',
},
{
userId: 9,
eventId: 51,
attendance: 'attending',
calendar: 'added',
},
{
userId: 3,
eventId: 45,
attendance: 'declined',
calendar: 'unset',
},
{
userId: 9,
eventId: 35,
attendance: 'attending',
calendar: 'removed',
},
{
userId: 4,
eventId: 17,
attendance: 'attending',
calendar: 'added',
},
{
userId: 4,
eventId: 14,
attendance: 'attending',
calendar: 'removed',
},
{
userId: 9,
eventId: 31,
attendance: 'attending',
calendar: 'added',
},
{
userId: 9,
eventId: 32,
attendance: 'attending',
calendar: 'unset',
},
{
userId: 16,
eventId: 72,
attendance: 'attending',
calendar: 'added',
},
];
