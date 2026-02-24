/** SEO landing pages — Estonian content */

export interface SeoSection {
  title: string
  content: string[]
  list?: string[]
}

export interface SeoLandingData {
  slug: string
  title: string
  intro: string
  sections: SeoSection[]
  ctaText?: string
}

export const SEO_LANDING_PAGES: Record<string, SeoLandingData> = {
  'tulekaitse-kontoritele': {
    slug: 'tulekaitse-kontoritele',
    title: 'Tulekaitse kontoritele',
    intro: 'Kaasaegne kontor on täis tehnikat, dokumente ja inimesi. Iga elektriseade, server, kööginurk või laadimispunkt võib olla potentsiaalne tuleoht. Professionaalne tulekaitse aitab ennetada õnnetusi, kaitsta töötajaid ning tagada ettevõtte töö järjepidevuse.',
    sections: [
      {
        title: 'Miks on tulekaitse kontoris kriitilise tähtsusega?',
        content: [
          'Tulekahju võib põhjustada märkimisväärset varalist kahju ning peatada ettevõtte tegevuse pikaks ajaks. Hästi läbimõeldud tuleohutussüsteem vähendab riske ja aitab täita seadusest tulenevaid nõudeid.',
        ],
        list: [
          'Suur hulk elektriseadmeid ja pikendusjuhtmeid',
          'Serveriruumid ja andmekeskused',
          'Paber- ja arhiividokumendid',
          'Suur inimeste liikumine tööpäeva jooksul',
        ],
      },
      {
        title: 'Meie teenused kontoritele',
        content: [
          'Pakume terviklikke tulekaitselahendusi:',
        ],
        list: [
          'Tulekustutite müük, paigaldus ja hooldus',
          'Automaatsete tulekahjusignalisatsioonisüsteemide paigaldus',
          'Evakuatsiooniplaanide koostamine',
          'Turvavalgustuse ja evakuatsioonivalgustuse lahendused',
          'Tuleohutusalane dokumentatsioon ja auditid',
          'Töötajate tuleohutuskoolitus',
        ],
      },
      {
        title: 'Individuaalne lähenemine',
        content: [
          'Iga kontor on erinev – olgu see väike büroo või mitmekorruseline ärihoone. Hindame objekti eripärasid ning pakume lahendusi, mis vastavad nii Eesti seadusandlusele kui ka teie ettevõtte vajadustele.',
          'Tagame, et teie kontor on turvaline, nõuetele vastav ja valmis igaks olukorraks.',
        ],
      },
    ],
    ctaText: 'Taotle tasuta audiiti',
  },
  'tulekaitse-restoranidele': {
    slug: 'tulekaitse-restoranidele',
    title: 'Tulekaitse restoranidele',
    intro: 'Restoranid ja toitlustusasutused kuuluvad kõrgema tuleohuga objektide hulka. Avatud leegid, kuumad pinnad, rasvased ventilatsioonisüsteemid ja tihe külastajate voog suurendavad tulekahju riski. Professionaalne tulekaitse aitab kaitsta nii teie külalisi, töötajaid kui ka ettevõtte mainet.',
    sections: [
      {
        title: 'Peamised riskikohad restoranides',
        content: [],
        list: [
          'Köögiseadmed (pliidid, fritüürid, ahjud)',
          'Rasvakanalid ja ventilatsioonisüsteemid',
          'Gaasiseadmed',
          'Elektriseadmete ülekoormus',
          'Küünlad ja dekoratiivne avatud tuli',
        ],
      },
      {
        title: 'Meie lahendused restoranidele',
        content: [
          'Pakume spetsiaalseid tulekaitselahendusi toitlustusasutustele:',
        ],
        list: [
          'Köögipõlengute jaoks sobivad kustutussüsteemid',
          'Automaatne tulekahjusignalisatsioon',
          'Tulekustutite regulaarne kontroll ja hooldus',
          'Rasvakanalite tuleohutuse hindamine',
          'Evakuatsiooniplaanide koostamine',
          'Töötajate praktiline tulekustutuskoolitus',
        ],
      },
      {
        title: 'Vastavus nõuetele ja kindlustustingimustele',
        content: [
          'Aitame tagada, et teie restoran vastab kõigile tuleohutusnõuetele ning kindlustusettevõtete tingimustele. Regulaarne kontroll ja dokumenteeritud hooldus vähendavad riske ning annavad kindlustunde.',
          'Turvaline restoran on usaldusväärne restoran.',
        ],
      },
    ],
    ctaText: 'Taotle tasuta audiiti',
  },
  'tulekaitse-laotele': {
    slug: 'tulekaitse-laotele',
    title: 'Tulekaitse ladudele',
    intro: 'Laod sisaldavad sageli suures koguses kaupa, pakendeid ja kergestisüttivaid materjale. Tulekahju laos võib levida kiiresti ning põhjustada märkimisväärseid kahjusid. Tõhus tulekaitse on kriitilise tähtsusega nii varade kaitsmiseks kui ka ettevõtte tegevuse jätkusuutlikkuse tagamiseks.',
    sections: [
      {
        title: 'Lao tuleohutuse peamised riskid',
        content: [],
        list: [
          'Suured kaubakogused ja kõrged riiulisüsteemid',
          'Puit- ja plastpakendid',
          'Tõstukite laadimisalad',
          'Küttesüsteemid',
          'Piiratud nähtavus ja keerukas evakuatsioon',
        ],
      },
      {
        title: 'Pakume ladudele',
        content: [],
        list: [
          'Tuleohutusauditeid ja riskianalüüse',
          'Automaatseid kustutussüsteeme (sprinklerlahendused)',
          'Tulekustutite paigaldust ja hooldust',
          'Tulekahjusignalisatsiooni süsteeme',
          'Evakuatsioonimärgistust ja -valgustust',
          'Tuleohutuse dokumentatsiooni ja koolitusi',
        ],
      },
      {
        title: 'Süsteemne ja professionaalne lähenemine',
        content: [
          'Arvestame lao suurust, ladustatava kauba tüüpi ning tööprotsesse. Meie eesmärk on luua terviklik tuleohutussüsteem, mis ennetab õnnetusi ja minimeerib kahjusid.',
          'Investeering tulekaitsesse on investeering teie ettevõtte turvalisse tulevikku.',
        ],
      },
    ],
    ctaText: 'Taotle tasuta audiiti',
  },
  'tulekaitse-kaubanduskeskustele': {
    slug: 'tulekaitse-kaubanduskeskustele',
    title: 'Tulekaitse kaubanduskeskustele',
    intro: 'Kaubanduskeskused on suure külastajate arvuga avalikud hooned, kus tuleohutus peab olema kõrgeimal tasemel. Suured pinnad, mitmed rentnikud ja keerukas tehnosüsteem nõuavad professionaalset ning hästi koordineeritud tulekaitselahendust.',
    sections: [
      {
        title: 'Kaubanduskeskuste peamised väljakutsed',
        content: [],
        list: [
          'Suur inimeste hulk tipptundidel',
          'Mitmekorruselised hooned',
          'Erineva otstarbega pinnad (poed, toitlustus, laod)',
          'Keerukad ventilatsiooni- ja elektrisüsteemid',
          'Ühised evakuatsiooniteed',
        ],
      },
      {
        title: 'Meie terviklahendused',
        content: [],
        list: [
          'Tulekahjusignalisatsiooni projekteerimine ja paigaldus',
          'Automaatkustutussüsteemid',
          'Suitsuärastussüsteemid',
          'Evakuatsioonivalgustus ja märgistus',
          'Regulaarne hooldus ja kontroll',
          'Koostöö haldusfirmade ja rentnikega',
        ],
      },
      {
        title: 'Turvalisus kui prioriteet',
        content: [
          'Tagame, et kogu hoone vastab kehtivatele tuleohutusnõuetele ning et süsteemid toimivad laitmatult ka kriisiolukorras. Regulaarne hooldus ja testimine on võtmetähtsusega.',
          'Turvaline kaubanduskeskus loob külastajatele ja rentnikele kindlustunde.',
        ],
      },
    ],
    ctaText: 'Taotle tasuta audiiti',
  },
  'hinnakiri': {
    slug: 'hinnakiri',
    title: 'Hinnakiri',
    intro: 'Tulekaitseteenuste hind sõltub objekti suurusest, eripäradest ning vajalike süsteemide mahust. Pakume paindlikke ja läbipaistvaid hinnalahendusi nii väikestele kui ka suurtele ettevõtetele.',
    sections: [
      {
        title: 'Näidishinnad',
        content: [],
        list: [
          'Tulekustuti hooldus — alates 15 € / tk',
          'Tulekustuti müük — alates 35 €',
          'Tulekahjusignalisatsiooni kontroll — alates 120 €',
          'Evakuatsiooniplaani koostamine — alates 90 €',
          'Tuleohutusaudit — hind kokkuleppel',
        ],
      },
      {
        title: 'Personaalsed pakkumised',
        content: [
          'Iga objekt on erinev. Täpse hinnapakkumise koostamiseks:',
        ],
        list: [
          'Hindame objekti kohapeal või plaanide alusel',
          'Kaardistame riskid ja nõuded',
          'Koostame detailse ja läbipaistva pakkumise',
        ],
      },
    ],
    ctaText: 'Võta ühendust personaalse pakkumise saamiseks',
  },
}
