/* ==========================================================================
   Resource Library.
   Data is taken from the Housing Assembly Resource List (files/resource-list.docx).
   Renders a searchable, filterable catalogue into #library on resources.html.
   To add a document: add one object to LIBRARY_ITEMS below.
   ========================================================================== */

/* type    -> short label + badge colour (see styles.css .lib-card__type--*)
   category-> the section it belongs to, used by the filter chips
   url      -> direct link (web pages, news, downloads, open-access articles)
   doi      -> digital object identifier; turned into a https://doi.org/ link
   oa       -> true for open-access academic articles (bold in the source doc)
   note     -> shown instead of a link when there is no url or doi
   linkLabel-> custom text for the action link (optional)                   */

const COCT_LIBRARY_OPAC = "https://opac.capetown.gov.za";

const LIBRARY_ITEMS = [
  /* ---- Housing Assembly guides (hosted on this site) ------------------- */
  {
    title: "Housing Assembly Resource List",
    authors: "The Housing Assembly",
    year: 2025,
    source: "Reading and reference list",
    type: "guide",
    category: "Housing Assembly Guides",
    url: "files/resource-list.docx",
    meta: "DOCX · 33.58 KB",
  },
  {
    title: "A Tenant's Guide to Rental Housing",
    authors: "Department of Human Settlements",
    year: 2013,
    source: "Practical guide",
    type: "guide",
    category: "Housing Assembly Guides",
    url: "files/tenants-guide.pdf",
    meta: "PDF · 567.98 KB",
  },
  {
    title: "Resisting Evictions in South Africa: A Legal and Practical Guide",
    authors: "Socio-Economic Rights Institute (SERI)",
    year: 2015,
    source: "Legal and practical guide",
    type: "guide",
    category: "Housing Assembly Guides",
    url: "files/resisting-evictions.pdf",
    meta: "PDF · 797.18 KB",
  },

  /* ---- Newsletters (hosted on this site) ------------------------------- */
  {
    title: "Housing Assembly Newsletter 1",
    authors: "The Housing Assembly",
    year: 2025,
    source: "Community newsletter",
    type: "newsletter",
    category: "Newsletters",
    url: "files/newsletter-1.pdf",
    meta: "PDF · 987 KB",
  },
  {
    title: "Housing Assembly Newsletter 2",
    authors: "The Housing Assembly",
    year: 2022,
    source: "Community newsletter",
    type: "newsletter",
    category: "Newsletters",
    url: "files/newsletter-2.pdf",
    meta: "PDF · 2.61 MB",
  },
  {
    title: "Housing Assembly Newsletter 3",
    authors: "The Housing Assembly",
    year: 2025,
    source: "Community newsletter",
    type: "newsletter",
    category: "Newsletters",
    url: "files/newsletter-3.pdf",
    meta: "PDF · 1.12 MB",
  },
  {
    title: "Housing Assembly Newsletter 4",
    authors: "The Housing Assembly",
    year: 2025,
    source: "Community newsletter",
    type: "newsletter",
    category: "Newsletters",
    url: "files/newsletter-4.pdf",
    meta: "PDF · 1.22 MB",
  },

  /* ---- Web resources --------------------------------------------------- */
  {
    title: "Housing — Elitsha",
    authors: "Workers' World Media Productions",
    year: 2025,
    source: "Elitsha News",
    type: "web",
    category: "Web Resources",
    url: "https://elitshanews.org.za/category/housing/",
  },
  {
    title: "Topic: Housing — GroundUp News",
    authors: "GroundUp News",
    year: 2025,
    source: "GroundUp News",
    type: "web",
    category: "Web Resources",
    url: "https://groundup.org.za/topic/housing/",
  },
  {
    title: "The People's Land Map",
    authors: "Ndifuna Ukwazi",
    year: 2025,
    source: "Interactive map of state-owned land",
    type: "web",
    category: "Web Resources",
    url: "https://peopleslandmap.nu.org.za/",
  },
  {
    title: "The Right to Adequate Housing: Factsheet",
    authors: "South African Human Rights Commission",
    year: null,
    source: "SAHRC",
    type: "web",
    category: "Web Resources",
    url: "https://www.sahrc.org.za/home/21/files/Fact%20Sheet%20on%20the%20right%20to%20adequate%20housing.pdf",
  },
  {
    title: "Housing | UN-Habitat",
    authors: "UN-Habitat",
    year: 2025,
    source: "UN-Habitat",
    type: "web",
    category: "Web Resources",
    url: "https://unhabitat.org/topic/housing",
  },

  /* ---- Books available from City of Cape Town libraries ---------------- */
  {
    title: "Living politics in South Africa's urban shacklands",
    authors: "Chance, K.R.",
    year: 2018,
    source: "Chicago: The University of Chicago Press",
    type: "book",
    category: "Books (City of Cape Town Libraries)",
    url: COCT_LIBRARY_OPAC,
    linkLabel: "Check location and availability in CoCT Libraries",
  },
  {
    title: "Cities with 'slums': from informal settlement eradication to a right to the city in Africa",
    authors: "Huchzermeyer, M.",
    year: 2011,
    source: "Claremont, Cape Town: UCT Press",
    type: "book",
    category: "Books (City of Cape Town Libraries)",
    url: COCT_LIBRARY_OPAC,
    linkLabel: "Check location and availability in CoCT Libraries",
  },
  {
    title: "No land! No house! No vote!: voices from Symphony Way",
    authors: "Jubelin, B. & Sacks, J.",
    year: 2011,
    source: "Cape Town: Pambazuka Press",
    type: "book",
    category: "Books (City of Cape Town Libraries)",
    url: COCT_LIBRARY_OPAC,
    linkLabel: "Check location and availability in CoCT Libraries",
  },
  {
    title: "Making freedom: apartheid, squatter politics, and the struggle for home",
    authors: "Makhulu, A.-M.",
    year: 2015,
    source: "Durham: Duke University Press",
    type: "book",
    category: "Books (City of Cape Town Libraries)",
    url: COCT_LIBRARY_OPAC,
    linkLabel: "Check location and availability in CoCT Libraries",
  },
  {
    title: "Street law: practical law for South African students — V.5, welfare and housing law",
    authors: "McQuoid Mason, D.",
    year: 1992,
    source: "South Africa: Juta and Company",
    type: "book",
    category: "Books (City of Cape Town Libraries)",
    url: COCT_LIBRARY_OPAC,
    linkLabel: "Check location and availability in CoCT Libraries",
  },
  {
    title: "Landlord and tenant: rights and obligations",
    authors: "Mohamed, S.-I.",
    year: 2019,
    source: "South Africa: LexisNexis",
    type: "book",
    category: "Books (City of Cape Town Libraries)",
    url: COCT_LIBRARY_OPAC,
    linkLabel: "Check location and availability in CoCT Libraries",
  },
  {
    title: "No place to rest: forced removals and the law in South Africa — selected papers",
    authors: "Murray, C. & O'Regan, C. (Eds.)",
    year: 1990,
    source: "Cape Town: Oxford University Press & Labour Law Unit, UCT",
    type: "book",
    category: "Books (City of Cape Town Libraries)",
    url: COCT_LIBRARY_OPAC,
    linkLabel: "Check location and availability in CoCT Libraries",
  },
  {
    title: "Amakomiti: grassroots democracy in South African shack settlements",
    authors: "Ngwane, T.",
    year: 2021,
    source: "Johannesburg: Jacana Media",
    type: "book",
    category: "Books (City of Cape Town Libraries)",
    doi: "10.2307/j.ctv1g6q904",
  },
  {
    title: "Urban vulnerability: perspectives from southern Africa",
    authors: "Nomdo, C., Coetzee, E. & Chanda, F.K.",
    year: 2002,
    source: "Cape Town: Periperi Publications",
    type: "book",
    category: "Books (City of Cape Town Libraries)",
    url: COCT_LIBRARY_OPAC,
    linkLabel: "Check location and availability in CoCT Libraries",
  },
  {
    title: "Impossible return: Cape Town's forced removals",
    authors: "O'Connell, S. & Brown, D.J.",
    year: 2019,
    source: "Cape Town: Kwela Books",
    type: "book",
    category: "Books (City of Cape Town Libraries)",
    url: COCT_LIBRARY_OPAC,
    linkLabel: "Check location and availability in CoCT Libraries",
  },
  {
    title: "The surplus people: forced removals in South Africa",
    authors: "Platzky, L. & Walker, C.",
    year: 1985,
    source: "Johannesburg: Ravan Press",
    type: "book",
    category: "Books (City of Cape Town Libraries)",
    url: COCT_LIBRARY_OPAC,
    linkLabel: "Check location and availability in CoCT Libraries",
  },
  {
    title: "A place to live: gender research on housing in Africa",
    authors: "Schlyter, A.",
    year: 1996,
    source: "Uppsala: Nordiska Afrikainstitutet",
    type: "book",
    category: "Books (City of Cape Town Libraries)",
    url: COCT_LIBRARY_OPAC,
    linkLabel: "Check location and availability in CoCT Libraries",
  },
  {
    title: "Jobs from housing: employment, building materials, and enabling strategies for urban development",
    authors: "Spence, R.",
    year: 1993,
    source: "London: Intermediate Technology",
    type: "book",
    category: "Books (City of Cape Town Libraries)",
    url: COCT_LIBRARY_OPAC,
    linkLabel: "Check location and availability in CoCT Libraries",
  },
  {
    title: "Forced removal: the division, segregation, and control of the people of South Africa",
    authors: "Unterhalter, E.",
    year: 1987,
    source: "London: International Defence and Aid Fund for Southern Africa",
    type: "book",
    category: "Books (City of Cape Town Libraries)",
    url: COCT_LIBRARY_OPAC,
    linkLabel: "Check location and availability in CoCT Libraries",
  },
  {
    title: "It feels like it's the end of the world: Cape Town's youth talk about gangs and community violence",
    authors: "Ward, C.L.",
    year: 2007,
    source: "Tshwane: Institute for Security Studies",
    type: "book",
    category: "Books (City of Cape Town Libraries)",
    url: COCT_LIBRARY_OPAC,
    linkLabel: "Check location and availability in CoCT Libraries",
  },
  {
    title: "Hostels in South Africa: spaces of perplexity",
    authors: "Xulu-Gama, N.",
    year: 2017,
    source: "Durban",
    type: "book",
    category: "Books (City of Cape Town Libraries)",
    url: "http://hdl.handle.net/11427/37925",
  },

  /* ---- Housing Assembly & housing rights advocacy in the news ---------- */
  {
    title: "Right to housing: City of Cape Town leaves Bromwell Street residents in limbo after landmark ConCourt ruling",
    authors: "Banda, M.",
    year: 2025,
    source: "Daily Maverick",
    type: "news",
    category: "In the News",
    url: "https://www.dailymaverick.co.za/article/2025-01-08-city-of-cape-town-leaves-bromwell-street-residents-in-limbo-after-landmark-concourt-ruling/",
  },
  {
    title: "Spatial apartheid: Bromwell ruling highlights urgent need for housing reform in Cape Town's displacement crisis",
    authors: "Cogger, J.",
    year: 2025,
    source: "Daily Maverick",
    type: "news",
    category: "In the News",
    url: "https://www.dailymaverick.co.za/article/2025-02-04-bromwell-ruling-highlights-urgent-need-for-housing-reform-in-cape-towns-displacement-crisis/",
  },
  {
    title: "Legal battle looms over Durban social housing sale",
    authors: "Comins, L.",
    year: 2024,
    source: "Mail & Guardian",
    type: "news",
    category: "In the News",
    url: "https://mg.co.za/news/2024-07-14-legal-battle-looms-over-durban-social-housing-sale/",
  },
  {
    title: "Activists want 12 more pieces of public land used for housing",
    authors: "Damons, M.",
    year: 2024,
    source: "GroundUp",
    type: "news",
    category: "In the News",
    url: "https://groundup.org.za/article/activists-demand-president-release-state-owned-land-for-affordable-housing/",
  },
  {
    title: "Cape Town City Centre tenants in tears as Municipality auctions their homes",
    authors: "Gontsana, M.-A.",
    year: 2023,
    source: "GroundUp",
    type: "news",
    category: "In the News",
    url: "https://groundup.org.za/article/maynard-street-tenants-distraught-as-city-places-the-council-homes-on-auction/",
  },
  {
    title: "Shack erected at Helen Zille's residence",
    authors: "Hendricks, A.",
    year: 2018,
    source: "GroundUp",
    type: "news",
    category: "In the News",
    url: "https://groundup.org.za/article/shack-erected-helen-zilles-residence/",
  },
  {
    title: "Families fear eviction from old train yard",
    authors: "Hendricks, A.",
    year: 2024,
    source: "GroundUp",
    type: "news",
    category: "In the News",
    url: "https://groundup.org.za/article/occupiers-on-prasa-land-fear-eviction/",
  },
  {
    title: "Survivors of apartheid-era forced removals from Cape Town win a crucial legal battle",
    authors: "Kulkarni, P.",
    year: 2024,
    source: "People's Dispatch",
    type: "news",
    category: "In the News",
    url: "https://peoplesdispatch.org/2024/12/27/survivors-of-apartheid-era-forced-removals-from-cape-town-win-a-crucial-legal-battle/",
  },
  {
    title: "Housing crisis inextricably entwined with land occupations",
    authors: "Matlawe, K.",
    year: 2019,
    source: "Mail & Guardian",
    type: "news",
    category: "In the News",
    url: "https://mg.co.za/article/2019-01-23-housing-crisis-inextricably-entwined-with-land-occupations/",
  },
  {
    title: "Explainer: Tracking social housing and how it works in the City of Cape Town",
    authors: "Metelerkamp, T.",
    year: 2024,
    source: "Daily Maverick",
    type: "news",
    category: "In the News",
    url: "https://www.dailymaverick.co.za/article/2024-10-02-what-is-social-housing-and-how-does-it-work-in-the-city-of-cape-town/",
  },
  {
    title: "Crucial decision: Cape Town's Tafelberg case goes to ConCourt — activists call for coordinated affordable housing plan",
    authors: "Metelerkamp, T.",
    year: 2025,
    source: "Daily Maverick (via NexisUni)",
    type: "news",
    category: "In the News",
    note: "Available via the NexisUni database",
  },
  {
    title: "So you really want to talk about land expropriation?",
    authors: "Mthombothi, B.",
    year: 2025,
    source: "Sunday Times",
    type: "news",
    category: "In the News",
    url: "https://www.timeslive.co.za/sunday-times/opinion-and-analysis/opinion/2025-05-25-so-you-really-want-to-talk-about-land-expropriation/",
  },
  {
    title: "Abahlali baseMjondolo condemns forced evictions in South Africa",
    authors: "Mwangi, N.",
    year: 2024,
    source: "People's Dispatch",
    type: "news",
    category: "In the News",
    url: "https://peoplesdispatch.org/2024/11/09/abahlali-basemjondolo-condemns-forced-evictions-in-south-africa/",
  },
  {
    title: "Youth mobilisation needed to forge inclusive future",
    authors: "Ntlemeza, A.",
    year: 2023,
    source: "Sowetan",
    type: "news",
    category: "In the News",
    url: "https://www.sowetanlive.co.za/opinion/columnists/2023-08-24-aphiwe-ntlemeza-youth-mobilisation-needed-to-forge-inclusive-future/",
  },
  {
    title: "Dispossession commemoration: Pillowcases and stones — heartache of brutal District Six forced removals still lingers",
    authors: "Payne, S.",
    year: 2024,
    source: "Daily Maverick",
    type: "news",
    category: "In the News",
    url: "https://www.dailymaverick.co.za/article/2024-02-11-pillowcases-and-stones-heartache-of-brutal-district-six-forced-removals-still-lingers/",
  },
  {
    title: "'Release Tafelberg land now, Mr Premier'",
    authors: "Serra, G.",
    year: 2024,
    source: "Cape Argus / Argus Weekend",
    type: "news",
    category: "In the News",
    url: "https://iol.co.za/capeargus/news/2024-09-17-housing-activists-petition-on-sea-point-site-release-tafelberg-land-now-mr-premier/",
  },
  {
    title: "Calls for Israel boycott intensify",
    authors: "Shakirah, T.",
    year: 2024,
    source: "Cape Argus / Argus Weekend",
    type: "news",
    category: "In the News",
    url: "https://iol.co.za/capeargus/news/2024-10-07-calls-for-israel-boycott-intensify/",
  },
  {
    title: "NPO responds to five fires in five days",
    authors: "Shakirah, T.",
    year: 2024,
    source: "Cape Argus / Argus Weekend",
    type: "news",
    category: "In the News",
    url: "https://iol.co.za/capeargus/news/2024-12-23-gift-of-the-givers-responds-to-five-informal-settlement-fires-in-five-days/",
  },
  {
    title: "Shift for change: Growing women leaders is the goal of land housing rights movement Abahlali baseMjondolo",
    authors: "Sikhakhane, N.",
    year: 2024,
    source: "Daily Maverick",
    type: "news",
    category: "In the News",
    url: "https://www.dailymaverick.co.za/article/2024-08-09-growing-women-leaders-is-the-goal-of-land-housing-rights-movement-abahlali-basemjondolo/",
  },
  {
    title: "Cape Flats women protest against poverty, patriarchy",
    authors: "Vuso, S.",
    year: 2022,
    source: "Cape Times",
    type: "news",
    category: "In the News",
    url: "https://www.iol.co.za/capetimes/news/cape-flats-women-protest-against-poverty-patriarchy-f89a1fe3-5bf7-47dd-aa98-7c929753a2f3/",
  },

  /* ---- Academic: Activism, Organizing & Political Education ------------ */
  {
    title: "Urban social movements and local state capacity",
    authors: "Bradlow, B.H.",
    year: 2024,
    source: "World Development, 173",
    type: "academic",
    category: "Activism, Organizing & Political Education",
    doi: "10.1016/j.worlddev.2023.106415",
    oa: true,
  },
  {
    title: "'Setting the record straight': the creation and curation of archives by activist communities",
    authors: "Carter, E.",
    year: 2017,
    source: "Archives & Records, 38(1)",
    type: "academic",
    category: "Activism, Organizing & Political Education",
    doi: "10.1080/23257962.2016.1260532",
    oa: true,
  },
  {
    title: "Multi-layered encounters between Reclaim the City and the Cape Town municipality",
    authors: "Daniel, A.",
    year: 2024,
    source: "Canadian Journal of African Studies, 58(2)",
    type: "academic",
    category: "Activism, Organizing & Political Education",
    doi: "10.1080/00083968.2024.2354912",
    oa: true,
  },
  {
    title: "If housing is a right, squatting is a duty: social movements against selective implementation of human rights",
    authors: "De Souza, H.H.A. (Master's thesis)",
    year: 2015,
    source: "Arctic University of Norway",
    type: "academic",
    category: "Activism, Organizing & Political Education",
    url: "https://hdl.handle.net/10037/9258",
    oa: true,
  },
  {
    title: "Creating political subjects: collective knowledge and action to enact housing rights in Spain",
    authors: "García-Lamarca, M.",
    year: 2017,
    source: "Community Development Journal, 52(3)",
    type: "academic",
    category: "Activism, Organizing & Political Education",
    doi: "10.1093/cdj/bsx025",
    oa: true,
  },
  {
    title: "The credibility of (in)formality: or, the irrelevance of institutional form in judging performance",
    authors: "Ho, P.",
    year: 2020,
    source: "Cities, 99",
    type: "academic",
    category: "Activism, Organizing & Political Education",
    doi: "10.1016/j.cities.2020.102609",
    oa: true,
  },
  {
    title: "Dis-locating public space: Occupy Rondebosch Common, Cape Town",
    authors: "Houssay-Holzschuch, M. & Thébault, E.",
    year: 2017,
    source: "Environment & Planning A, 49(3)",
    type: "academic",
    category: "Activism, Organizing & Political Education",
    doi: "10.1177/0308518X15603985",
  },
  {
    title: "Popular pedagogy and the changing political landscape: a women's housing movement in South Africa",
    authors: "Ismail, S.",
    year: 2009,
    source: "Studies in Continuing Education, 31(3)",
    type: "academic",
    category: "Activism, Organizing & Political Education",
    doi: "10.1080/01580370903271479",
  },
  {
    title: "The Victoria Mxenge Housing Project: Women Building Communities Through Social Activism and Informal Learning",
    authors: "Ismail, S.",
    year: 2015,
    source: "Cape Town: UCT Press",
    type: "academic",
    category: "Activism, Organizing & Political Education",
    doi: "10.58331/UCTPRESS.54",
    oa: true,
  },
  {
    title: "Contesting housing inequality: housing rights and social movements",
    authors: "Jordan, M.",
    year: 2024,
    source: "Modern Law Review, 87(1)",
    type: "academic",
    category: "Activism, Organizing & Political Education",
    doi: "10.1111/1468-2230.12828",
    oa: true,
  },
  {
    title: "'Making things happen': literacy and agency in housing struggles in South Africa",
    authors: "Kell, C.",
    year: 2008,
    source: "Journal of Development Studies, 44(6)",
    type: "academic",
    category: "Activism, Organizing & Political Education",
    doi: "10.1080/00220380802058263",
  },
  {
    title: "Learning through housing activism in Barcelona: knowledge production and sharing in neighbourhood-based housing groups",
    authors: "Lira, M. & March, H.",
    year: 2023,
    source: "Housing Studies, 38(5)",
    type: "academic",
    category: "Activism, Organizing & Political Education",
    doi: "10.1080/02673037.2021.1921121",
  },
  {
    title: "Post-Apartheid social movements and the quest for the elusive 'new' South Africa",
    authors: "Madlingozi, T.",
    year: 2007,
    source: "Journal of Law & Society, 34(1)",
    type: "academic",
    category: "Activism, Organizing & Political Education",
    doi: "10.1111/j.1467-6478.2007.00383.x",
  },
  {
    title: "Living in and out of time: Youth-led activism in Aotearoa New Zealand",
    authors: "Nairn, K., Kidman, J., Matthews, K.R., Showden, C.R. & Parker, A.",
    year: 2021,
    source: "Time & Society, 30(2)",
    type: "academic",
    category: "Activism, Organizing & Political Education",
    doi: "10.1177/0961463X21989858",
  },
  {
    title: "Scaffolding collective hope and agency in youth activist groups: 'I get hope through action'",
    authors: "Nairn, K., Showden, C.R., Matthews, K.R., Kidman, J. & Sligo, J.",
    year: 2024,
    source: "The Sociological Review, 73(2)",
    type: "academic",
    category: "Activism, Organizing & Political Education",
    doi: "10.1177/00380261241245546",
    oa: true,
  },
  {
    title: "The role of community based organizations in housing low-income people",
    authors: "Nhlabathi, S.S.",
    year: 2000,
    source: "South African Geographical Journal, 82(2)",
    type: "academic",
    category: "Activism, Organizing & Political Education",
    doi: "10.1080/03736245.2000.9713698",
  },
  {
    title: "Did India ever have a right to the city movement? Rethinking housing justice in violent times",
    authors: "Pati, S.",
    year: 2024,
    source: "International Journal of Urban and Regional Research, 48(4)",
    type: "academic",
    category: "Activism, Organizing & Political Education",
    doi: "10.1111/1468-2427.13249",
  },
  {
    title: "Residences, restitutions and resistance: a radical housing movement's understanding of post-socialist property redistribution",
    authors: "Popovici, V.",
    year: 2020,
    source: "City, 24(1-2)",
    type: "academic",
    category: "Activism, Organizing & Political Education",
    doi: "10.1080/13604813.2020.1739913",
  },
  {
    title: "The work of dwelling: living together in squatter housing cooperatives in Buenos Aires, Argentina",
    authors: "Procupez, V.I. (Ph.D. thesis)",
    year: 2012,
    source: "The Johns Hopkins University",
    type: "academic",
    category: "Activism, Organizing & Political Education",
    url: "https://www.proquest.com/dissertations-theses/work-dwelling-living-together-squatter-housing/docview/1036628271/se-2?accountid=14500",
  },
  {
    title: "Using Giddens's theory of 'structuration' and Freirean philosophy to understand participation in the Alexandra Renewal Project",
    authors: "Sinwell, L.",
    year: 2008,
    source: "Development Southern Africa, 25(3)",
    type: "academic",
    category: "Activism, Organizing & Political Education",
    doi: "10.1080/03768350802211776",
    oa: true,
  },
  {
    title: "Urban people power strategies in a connected world: patterns of practice, exchange, translation and learning",
    authors: "Tattersall, A. & Iveson, K.",
    year: 2023,
    source: "City, 27(5/6)",
    type: "academic",
    category: "Activism, Organizing & Political Education",
    doi: "10.1080/13604813.2023.2270877",
  },
  {
    title: "Prefiguring pragmatically? Prefigurative politics and people power strategies for winning affordable housing in Cape Town",
    authors: "Tattersall, A. & Iveson, K.",
    year: 2024,
    source: "International Journal of Urban & Regional Research, 48(3)",
    type: "academic",
    category: "Activism, Organizing & Political Education",
    doi: "10.1111/1468-2427.13235",
    oa: true,
  },
  {
    title: "Insecurity as confinement: the entrenched politics of staying put in Delhi and Mumbai",
    authors: "Weinstein, L.",
    year: 2017,
    source: "International Sociology, 32(4)",
    type: "academic",
    category: "Activism, Organizing & Political Education",
    doi: "10.1177/0268580917701604",
  },
  {
    title: "Challenges to substantive democracy in post-apartheid Cape Town: urban governance and community organising in Delft",
    authors: "Wessel, T.",
    year: 2010,
    source: "Norwegian Journal of Geography, 64(1)",
    type: "academic",
    category: "Activism, Organizing & Political Education",
    doi: "10.1080/00291951003589449",
  },
  {
    title: "Strategic protest and the negotiation of legibility in Cape Town: a case study of Reclaim the City",
    authors: "Wingfield, M.M.",
    year: 2023,
    source: "Social Dynamics, 49(3)",
    type: "academic",
    category: "Activism, Organizing & Political Education",
    doi: "10.1080/02533952.2023.2265598",
  },

  /* ---- Academic: Gentrification, Evictions & Forced Removals ----------- */
  {
    title: "Delineating caveats for (quality) education during displacement: the impact of forced migration on access to education",
    authors: "Benhura, A.R. & Naidu, M.",
    year: 2021,
    source: "Migration Studies, 9(2)",
    type: "academic",
    category: "Gentrification, Evictions & Forced Removals",
    doi: "10.1093/migration/mnz021",
  },
  {
    title: "Unlawful occupiers, eviction and the national state of disaster: South Africa's emergency legislation during COVID-19",
    authors: "Dube, F. & du Plessis, A.",
    year: 2021,
    source: "Journal of African Law, 62(S2)",
    type: "academic",
    category: "Gentrification, Evictions & Forced Removals",
    doi: "10.1017/S0021855321000401",
    oa: true,
  },
  {
    title: "Challenging spatial oppression in a context of housing rights denial: a case study in Area C, West Bank, Palestine",
    authors: "Dwaikat-Shaer, N. (Ph.D. thesis)",
    year: 2021,
    source: "McGill University",
    type: "academic",
    category: "Gentrification, Evictions & Forced Removals",
    url: "https://www.proquest.com/dissertations-theses/b-challenging-spatial-oppression-context-housing/docview/2701129927/se-2?accountid=14500",
  },
  {
    title: "The road to TRAs is paved with good intentions: dispossession through delivery in post-apartheid Cape Town",
    authors: "Levenson, Z.",
    year: 2018,
    source: "Urban Studies, 55(14)",
    type: "academic",
    category: "Gentrification, Evictions & Forced Removals",
    doi: "10.1177/0042098017735244",
  },
  {
    title: "Contesting violent displacement: the case of Warwick market in Durban, South Africa",
    authors: "Maharaj, B.",
    year: 2020,
    source: "International Development Planning Review, 42(1)",
    type: "academic",
    category: "Gentrification, Evictions & Forced Removals",
    doi: "10.3828/idpr.2019.25",
  },
  {
    title: "'Welbedacht is a beautiful place': placemaking and social transformation in a state resettlement programme in eThekwini, Durban",
    authors: "Moodley, S. & Marks, M.",
    year: 2023,
    source: "Transformation, 112",
    type: "academic",
    category: "Gentrification, Evictions & Forced Removals",
    doi: "10.1353/trn.2023.a926452",
  },
  {
    title: "Backyard shacks: the relative success of this housing option in Port Elizabeth",
    authors: "Morange, M.",
    year: 2002,
    source: "Urban Forum, 13(2)",
    type: "academic",
    category: "Gentrification, Evictions & Forced Removals",
    doi: "10.1007/s12132-002-0011-4",
  },
  {
    title: "Residents of Joe Slovo community v Thubelisha Homes and others: the two faces of engagement",
    authors: "Ray, B.",
    year: 2010,
    source: "Human Rights Law Review, 10(2)",
    type: "academic",
    category: "Gentrification, Evictions & Forced Removals",
    doi: "10.1093/hrlr/ngq002",
  },
  {
    title: "Occupations as reparative urban infrastructure: thinking with Cissie Gool House",
    authors: "Scheba, S. & Millington, N.",
    year: 2023,
    source: "City, 27(5-6)",
    type: "academic",
    category: "Gentrification, Evictions & Forced Removals",
    doi: "10.1080/13604813.2023.2266192",
    oa: true,
  },
  {
    title: "Fighting dispossession",
    authors: "Verghese, B. & Rawoot, I.",
    year: 2021,
    source: "New Internationalist, 531",
    type: "academic",
    category: "Gentrification, Evictions & Forced Removals",
    url: "https://newint.org/features/2021/04/06/fighting-dispossession-cape-town",
    oa: true,
  },
  {
    title: "The changing right to the city: urban renewal and housing rights in globalizing Shanghai and Mumbai",
    authors: "Weinstein, L. & Ren, X.",
    year: 2009,
    source: "City & Community, 8(4)",
    type: "academic",
    category: "Gentrification, Evictions & Forced Removals",
    doi: "10.1111/j.1540-6040.2009.01300.x",
  },
  {
    title: "(Im)mobility at the margins: low-income households' experiences of peripheral resettlement in India and South Africa",
    authors: "Williams, G., Charlton, S., Coelho, K., Mahadevia, D. & Meth, P.",
    year: 2022,
    source: "Housing Studies, 37(6)",
    type: "academic",
    category: "Gentrification, Evictions & Forced Removals",
    doi: "10.1080/02673037.2021.1946018",
    oa: true,
  },

  /* ---- Academic: Housing Policy & Economy ------------------------------ */
  {
    title: "Confounded but complacent: how the state sees responses to its housing intervention in Johannesburg",
    authors: "Charlton, S.",
    year: 2018,
    source: "Journal of Development Studies, 54(12)",
    type: "academic",
    category: "Housing Policy & Economy",
    doi: "10.1080/00220388.2018.1460465",
  },
  {
    title: "Spanning the spectrum: infrastructural experiences in South Africa's state housing programme",
    authors: "Charlton, S.",
    year: 2018,
    source: "International Development Planning Review, 40(2)",
    type: "academic",
    category: "Housing Policy & Economy",
    doi: "10.3828/idpr.2018.6",
  },
  {
    title: "Stretching state support: everyday practices and state assisted housing in apartheid and after",
    authors: "Charlton, S.",
    year: 2023,
    source: "Transformation, 112",
    type: "academic",
    category: "Housing Policy & Economy",
    doi: "10.1353/trn.2023.a926450",
  },
  {
    title: "Pounding at the tip of the iceberg: the dominant politics of informal settlement eradication in South Africa",
    authors: "Huchzermeyer, M.",
    year: 2010,
    source: "Politikon, 37(1)",
    type: "academic",
    category: "Housing Policy & Economy",
    doi: "10.1080/02589346.2010.492153",
  },
  {
    title: "Centring lived experience of homelessness in law and policy reform",
    authors: "Jones, C., Daly, A. & Pierce, T.",
    year: 2024,
    source: "Alternative Law Journal, 49(4)",
    type: "academic",
    category: "Housing Policy & Economy",
    doi: "10.1177/1037969x241290020",
  },
  {
    title: "Living on the Fringe in Post-Apartheid Cape Town",
    authors: "Levenson, Z.",
    year: 2017,
    source: "Contexts, 16(1)",
    type: "academic",
    category: "Housing Policy & Economy",
    doi: "10.1177/1536504217696060",
    oa: true,
  },
  {
    title: "Public endeavour and shelter at Cradock/Kaladokhwe/Nxuba, Eastern Cape, South Africa",
    authors: "Mabin, A.",
    year: 2023,
    source: "Transformation, 112",
    type: "academic",
    category: "Housing Policy & Economy",
    doi: "10.1353/trn.2023.a926455",
  },
  {
    title: "Introduction: public housing and its roles in social transformation",
    authors: "Mabin, A.",
    year: 2023,
    source: "Transformation, 112",
    type: "academic",
    category: "Housing Policy & Economy",
    doi: "10.1353/trn.2023.a926447",
  },
  {
    title: "A tale of two markets: unequal access to private property in a South African city",
    authors: "Marais, L., Awuzie, B., Cloete, J., Napier, M. & Greyling, E.",
    year: 2020,
    source: "Tijdschrift voor Economische en Sociale Geografie, 111(1)",
    type: "academic",
    category: "Housing Policy & Economy",
    doi: "10.1111/tesg.12367",
  },
  {
    title: "The cost of ownership: learning from Flamingo Court, a former social housing apartment block in Durban",
    authors: "Matsha, R.M., Erwin, K. & Musvot, G.",
    year: 2023,
    source: "Transformation, 112",
    type: "academic",
    category: "Housing Policy & Economy",
    doi: "10.1353/trn.2023.a926451",
  },
  {
    title: "Informalisation of state-subsidised housing in South Africa — the people's response to state paternalism",
    authors: "Mbatha, S.",
    year: 2023,
    source: "Transformation, 112",
    type: "academic",
    category: "Housing Policy & Economy",
    doi: "10.1353/trn.2023.a926453",
  },
  {
    title: "The right to housing and the pan-African city: challenges of inclusivity and equity — a review of four African countries",
    authors: "Mubangizi, J.",
    year: 2024,
    source: "Town & Regional Planning, 84",
    type: "academic",
    category: "Housing Policy & Economy",
    doi: "10.38140/trp.v84i.7971",
    oa: true,
  },
  {
    title: "The Games of Land Dispossession: Urban Governance and Sports Mega-Events",
    authors: "Omena, E.",
    year: 2023,
    source: "Singapore: Springer Nature / Palgrave Macmillan",
    type: "academic",
    category: "Housing Policy & Economy",
    doi: "10.1007/978-981-99-7536-5",
  },
  {
    title: "Where is the periphery even? Capturing urban marginality in South African human rights law",
    authors: "Pieterse, M.",
    year: 2019,
    source: "Urban Studies, 56(6)",
    type: "academic",
    category: "Housing Policy & Economy",
    doi: "10.1177/0042098018755067",
  },
  {
    title: "Housing policy in a context of HIV/AIDS and globalization",
    authors: "Tomlinson, R.",
    year: 2001,
    source: "International Journal of Urban & Regional Research, 25(3)",
    type: "academic",
    category: "Housing Policy & Economy",
    doi: "10.1111/1468-2427.00334",
  },
  {
    title: "Politics by design: competing design ideals in South Africa's low-income housing production",
    authors: "Wainer, L.S.",
    year: 2019,
    source: "City, 23(4/5)",
    type: "academic",
    category: "Housing Policy & Economy",
    doi: "10.1080/13604813.2019.1685296",
  },
  {
    title: "There's no place like home: access to housing for all South Africans",
    authors: "Wertman, C.A.",
    year: 2015,
    source: "Brooklyn Journal of International Law, 40(2)",
    type: "academic",
    category: "Housing Policy & Economy",
    url: "https://brooklynworks.brooklaw.edu/bjil/vol40/iss2/8",
    oa: true,
  },
  {
    title: "Housing as a basic human right: a reflection on South Africa",
    authors: "Zulu, N., Maphosa, N. & Sobantu, M.",
    year: 2019,
    source: "Southern African Journal of Social Work and Social Development, 31(1)",
    type: "academic",
    category: "Housing Policy & Economy",
    doi: "10.25159/2415-5829/4177",
    oa: true,
  },

  /* ---- Academic: Informal Settlements & Backyard Dwellings ------------- */
  {
    title: "Gendered il/legalities of housing formalisation in India and South Africa",
    authors: "Buthelezi, S., Rajasekhar, S., Cuomo, D., Brickell, K. & Meth, P.",
    year: 2019,
    source: "Environment & Planning A, 51(5)",
    type: "academic",
    category: "Informal Settlements & Backyard Dwellings",
    doi: "10.1177/0308518X18792898",
    oa: true,
  },
  {
    title: "Upgrading informal settlements in South Africa: policy, rhetoric and what residents really value",
    authors: "Del Mistro, R. & Hensher, D.A.",
    year: 2009,
    source: "Housing Studies, 24(3)",
    type: "academic",
    category: "Informal Settlements & Backyard Dwellings",
    doi: "10.1080/02673030902869279",
  },
  {
    title: "Eurhythmisation and organisational rites of housing squats in Rome",
    authors: "Grazioli, M.",
    year: 2023,
    source: "City, 27(3-4)",
    type: "academic",
    category: "Informal Settlements & Backyard Dwellings",
    doi: "10.1080/13604813.2023.2197551",
  },
  {
    title: "Augmented informality: South Africa's backyard dwellings as a by-product of formal housing policies",
    authors: "Lemanski, C.",
    year: 2009,
    source: "Habitat International, 33(4)",
    type: "academic",
    category: "Informal Settlements & Backyard Dwellings",
    doi: "10.1016/j.habitatint.2009.03.002",
  },
  {
    title: "Informal settlement upgrading, assets and poverty alleviation: longitudinal research in South Africa",
    authors: "Marais, L., John, N., Cloete, J. & Lenka, M.",
    year: 2018,
    source: "Development Southern Africa, 35(1)",
    type: "academic",
    category: "Informal Settlements & Backyard Dwellings",
    doi: "10.1080/0376835X.2017.1362331",
    oa: true,
  },
  {
    title: "'Marginalised formalisation': analysing the in/formal binary through policy and everyday experiences of 'poor' housing in South Africa",
    authors: "Meth, P.",
    year: 2020,
    source: "International Development Planning Review, 42(2)",
    type: "academic",
    category: "Informal Settlements & Backyard Dwellings",
    doi: "10.3828/idpr.2019.26",
    oa: true,
  },
  {
    title: "Effects of flood disasters on vulnerable residents in informal settlements in South Africa",
    authors: "Motloung, O.M.",
    year: 2024,
    source: "African Journal of Development Studies, 14(3)",
    type: "academic",
    category: "Informal Settlements & Backyard Dwellings",
    url: "https://hdl.handle.net/10520/ejc-aa_affrika1_v14_n3_a19",
  },

  /* ---- Academic: Related Issues --------------------------------------- */
  {
    title: "Housing policy in mining towns: issues of race and risk in South Africa",
    authors: "Marais, L.",
    year: 2018,
    source: "International Journal of Housing Policy, 18(2)",
    type: "academic",
    category: "Related Issues",
    doi: "10.1080/19491247.2018.1448153",
  },
  {
    title: "Urban housing for rural peasants: farmworker housing in South Africa",
    authors: "Marais, L. & Lenka, M.",
    year: 2021,
    source: "Development Southern Africa, 38(3)",
    type: "academic",
    category: "Related Issues",
    doi: "10.1080/0376835X.2020.1796596",
    oa: true,
  },
  {
    title: "Workshopping water justice: linking struggles from the Cape Flats to the rest of the continent",
    authors: "Murray, A., Meyer, F. & Fourie, E.",
    year: 2023,
    source: "Globalisation, Societies & Education, 21(5)",
    type: "academic",
    category: "Related Issues",
    doi: "10.1080/14767724.2023.2165478",
  },
];

/* Human-readable label for each type, used on the badge. */
const TYPE_LABELS = {
  guide: "Guide",
  newsletter: "Newsletter",
  web: "Web Resource",
  book: "Book",
  news: "News Article",
  academic: "Academic Article",
  community: "Community Submission",
};

/* Order the filter chips appear in. New categories submitted via the Google
   Form's Category dropdown (see buildCategoryList) are appended after these,
   with "Uncategorized" always pinned last. */
const CATEGORY_ORDER = [
  "Housing Assembly Guides",
  "Newsletters",
  "Web Resources",
  "Books (City of Cape Town Libraries)",
  "In the News",
  "Activism, Organizing & Political Education",
  "Gentrification, Evictions & Forced Removals",
  "Housing Policy & Economy",
  "Informal Settlements & Backyard Dwellings",
  "Related Issues",
];

/* Submissions come from a Google Form whose responses land in a Google
   Sheet. The Sheet is fetched live via the gviz/tq endpoint (no API key,
   no backend) and mapped onto the same item shape as LIBRARY_ITEMS so they
   render through the existing card/filter logic without special-casing.
   The Sheet must be shared "Anyone with the link can view". */
const LIBRARY_SHEET_ID = "1uzVgUCPU_OOqyd0v7p15Xgeeq0lotIRG3ZZDK2XEhu0";
const LIBRARY_SHEET_NAME = "Document Insertion Form (HA) (Responses)";
const LIBRARY_SHEET_GVIZ_URL =
  `https://docs.google.com/spreadsheets/d/${LIBRARY_SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(
    LIBRARY_SHEET_NAME
  )}`;

async function loadSheetSubmissions() {
  const response = await fetch(LIBRARY_SHEET_GVIZ_URL);
  if (!response.ok) throw new Error(`Failed to load Sheet: ${response.status}`);
  const text = await response.text();

  /* gviz wraps its JSON payload in a JS function call:
     google.visualization.Query.setResponse({...}); */
  const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);?\s*$/);
  if (!match) throw new Error("Unexpected gviz response format");
  const payload = JSON.parse(match[1]);

  if (payload.status === "error") {
    throw new Error(
      `gviz error: ${(payload.errors || []).map((e) => e.detailed_message || e.message).join("; ")}`
    );
  }

  const cols = payload.table.cols.map((c) => (c.label || "").trim());
  const rows = payload.table.rows || [];

  return rows
    .map((row) => sheetRowToObject(cols, row))
    .filter((obj) => obj["Title"])
    .map(mapSheetRowToItem);
}

/* Convert a gviz row (array of {v, f} cells) into a plain object keyed by
   column header, using the formatted value when present. */
function sheetRowToObject(cols, row) {
  const obj = {};
  cols.forEach((label, i) => {
    const cell = row.c[i];
    obj[label] = cell ? cell.f ?? cell.v ?? "" : "";
  });
  return obj;
}

/* Maps one Sheet row (keyed by the Google Form's exact question titles)
   onto the LIBRARY_ITEMS item shape. */
function mapSheetRowToItem(row) {
  const title = String(row["Title"] || "").trim();
  const authors = String(row["Author / Source"] || "").trim();
  const yearRaw = String(row["Year"] || "").trim();
  const year = /^\d{4}$/.test(yearRaw) ? Number(yearRaw) : null;
  const description = String(row["Short Description"] || "").trim();
  const categoryRaw = String(row["Category"] || "").trim();
  const category = categoryRaw || "Uncategorized";

  /* File-or-link branching: Forms writes the uploaded file's Drive link into
     "Document Upload", or a pasted URL into "Document Link" - exactly one
     should be populated per the form's required branching. */
  const fileUrl = String(row["Document Upload"] || "").trim();
  const linkUrl = String(row["Document Link"] || "").trim();
  const url = fileUrl || linkUrl || null;

  const coverRaw = String(row["Cover Image"] || "").trim();
  const cover = coverRaw ? driveFileUrlToEmbeddable(coverRaw) : null;

  return {
    title,
    authors,
    year,
    source: description,
    type: "community",
    category,
    url,
    cover,
  };
}

/* A Drive "view" share link (drive.google.com/file/d/<ID>/view) does not
   render inside <img src>; rewrite it to a direct, embeddable form using
   the Drive file ID. Returns null if no file ID can be extracted. */
function driveFileUrlToEmbeddable(driveUrl) {
  const match = driveUrl.match(/\/file\/d\/([^/]+)/) || driveUrl.match(/[?&]id=([^&]+)/);
  if (!match) return null;
  return `https://drive.google.com/uc?export=view&id=${match[1]}`;
}

async function setupLibrary() {
  const root = document.getElementById("library");
  if (!root) return;

  const searchInput = root.querySelector("#library-search");
  const chipWrap = root.querySelector("#library-filters");
  const oaToggle = root.querySelector("#library-oa");
  const list = root.querySelector("#library-list");
  const count = root.querySelector("#library-count");
  const empty = root.querySelector("#library-empty");

  let activeCategory = "all";
  let allItems = LIBRARY_ITEMS;

  try {
    const submissions = await loadSheetSubmissions();
    allItems = LIBRARY_ITEMS.concat(submissions);
  } catch (error) {
    console.error(error);
  }

  /* Build the filter chips: All + curated categories (fixed order) + any
     new category values submitted via the Form's Category dropdown +
     "Uncategorized" pinned last. */
  function buildCategoryList(items) {
    const seen = new Set();
    const dynamic = [];
    items.forEach((item) => {
      const cat = item.category;
      if (cat === "Uncategorized") return;
      if (CATEGORY_ORDER.includes(cat)) return;
      if (seen.has(cat)) return;
      seen.add(cat);
      dynamic.push(cat);
    });
    dynamic.sort((a, b) => a.localeCompare(b));

    const hasUncategorized = items.some((item) => item.category === "Uncategorized");

    return CATEGORY_ORDER.filter((cat) => items.some((item) => item.category === cat))
      .concat(dynamic)
      .concat(hasUncategorized ? ["Uncategorized"] : []);
  }

  const presentCategories = buildCategoryList(allItems);

  const chips = [{ value: "all", label: "All" }].concat(
    presentCategories.map((cat) => ({ value: cat, label: cat }))
  );

  chipWrap.innerHTML = chips
    .map(
      (chip, i) =>
        `<button type="button" class="lib-chip${i === 0 ? " is-active" : ""}" data-cat="${escapeAttr(
          chip.value
        )}">${escapeHtml(chip.label)}</button>`
    )
    .join("");

  function linkFor(item) {
    if (item.url) return item.url;
    if (item.doi) return `https://doi.org/${item.doi}`;
    return null;
  }

  function cardHtml(item) {
    const href = linkFor(item);
    const yearText = item.year ? ` &middot; ${item.year}` : "";
    const metaLine = item.meta || item.source || "";
    const authorsLine = item.authors || item.year
      ? `<p class="lib-card__authors">${escapeHtml(item.authors)}${yearText}</p>`
      : "";
    const coverHtml = item.cover
      ? `<div class="lib-card__cover"><img src="${escapeAttr(item.cover)}" alt="" loading="lazy"></div>`
      : "";

    const badges =
      `<span class="lib-card__type lib-card__type--${item.type}">${TYPE_LABELS[item.type] || item.type}</span>` +
      (item.oa ? `<span class="lib-card__oa">Open access</span>` : "");

    const linkText =
      item.linkLabel ||
      (item.type === "guide" || item.type === "newsletter" ? "Download" : "View");

    const action = href
      ? `<a class="lib-card__link" href="${escapeAttr(href)}" target="_blank" rel="noopener">${escapeHtml(
          linkText
        )} <span aria-hidden="true">&rarr;</span></a>`
      : `<span class="lib-card__note">${escapeHtml(item.note || "Reference only")}</span>`;

    return `
      <li class="lib-card" data-type="${item.type}">
        ${coverHtml}
        <div class="lib-card__badges">${badges}</div>
        <h3 class="lib-card__title">${escapeHtml(item.title)}</h3>
        ${authorsLine}
        ${metaLine ? `<p class="lib-card__source">${escapeHtml(metaLine)}</p>` : ""}
        <div class="lib-card__foot">${action}</div>
      </li>`;
  }

  function render() {
    const term = searchInput.value.trim().toLowerCase();
    const oaOnly = oaToggle.checked;

    const matches = allItems.filter((item) => {
      if (activeCategory !== "all" && item.category !== activeCategory) return false;
      if (oaOnly && !item.oa) return false;
      if (!term) return true;
      const haystack = [
        item.title,
        item.authors,
        item.source,
        item.category,
        TYPE_LABELS[item.type],
        item.year,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(term);
    });

    list.innerHTML = matches.map(cardHtml).join("");

    const total = allItems.length;
    count.textContent = matches.length === total
      ? `Showing all ${total} resources`
      : `Showing ${matches.length} of ${total} resources`;

    empty.hidden = matches.length !== 0;
  }

  chipWrap.addEventListener("click", (event) => {
    const btn = event.target.closest(".lib-chip");
    if (!btn) return;
    activeCategory = btn.dataset.cat;
    chipWrap.querySelectorAll(".lib-chip").forEach((c) =>
      c.classList.toggle("is-active", c === btn)
    );
    render();
  });

  searchInput.addEventListener("input", render);
  oaToggle.addEventListener("change", render);

  render();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/"/g, "&quot;");
}

setupLibrary();
