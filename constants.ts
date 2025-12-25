import { Prayer, PrayerCategory } from './types';

export const STATIC_PRAYERS: Prayer[] = [
  {
    id: 'padre-nuestro',
    title: 'Padre Nuestro',
    category: PrayerCategory.BASIC,
    content: `Padre nuestro, que estás en el cielo, santificado sea tu Nombre; venga a nosotros tu reino; hágase tu voluntad en la tierra como en el cielo.\n\nDanos hoy nuestro pan de cada día; perdona nuestras ofensas, como también nosotros perdonamos a los que nos ofenden; no nos dejes caer en la tentación, y líbranos del mal. Amén.`
  },
  {
    id: 'ave-maria',
    title: 'Ave María',
    category: PrayerCategory.BASIC,
    content: `Dios te salve, María, llena eres de gracia; el Señor es contigo. Bendita Tú eres entre todas las mujeres, y bendito es el fruto de tu vientre, Jesús.\n\nSanta María, Madre de Dios, ruega por nosotros pecadores, ahora y en la hora de nuestra muerte. Amén.`
  },
  {
    id: 'gloria',
    title: 'Gloria',
    category: PrayerCategory.BASIC,
    content: `Gloria al Padre, y al Hijo, y al Espíritu Santo.\n\nComo era en el principio, ahora y siempre, y por los siglos de los siglos. Amén.`
  },
  {
    id: 'credo',
    title: 'Credo de los Apóstoles',
    category: PrayerCategory.BASIC,
    content: `Creo en Dios, Padre Todopoderoso, Creador del cielo y de la tierra. Creo en Jesucristo, su único Hijo, Nuestro Señor, que fue concebido por obra y gracia del Espíritu Santo, nació de Santa María Virgen, padeció bajo el poder de Poncio Pilato, fue crucificado, muerto y sepultado, descendió a los infiernos, al tercer día resucitó de entre los muertos, subió a los cielos y está sentado a la derecha de Dios, Padre todopoderoso. Desde allí ha de venir a juzgar a vivos y muertos.\n\nCreo en el Espíritu Santo, la santa Iglesia católica, la comunión de los santos, el perdón de los pecados, la resurrección de la carne y la vida eterna. Amén.`
  },
  {
    id: 'salve',
    title: 'La Salve',
    category: PrayerCategory.MARIAN,
    content: `Dios te salve, Reina y Madre de misericordia, vida, dulzura y esperanza nuestra; Dios te salve. A Ti llamamos los desterrados hijos de Eva; a Ti suspiramos, gimiendo y llorando, en este valle de lágrimas. Ea, pues, Señora, abogada nuestra, vuelve a nosotros esos tus ojos misericordiosos; y después de este destierro muéstranos a Jesús, fruto bendito de tu vientre. ¡Oh clementísima, oh piadosa, oh dulce Virgen María!`
  },
  {
    id: 'angelus',
    title: 'El Ángelus',
    category: PrayerCategory.MARIAN,
    content: `V. El ángel del Señor anunció a María.\nR. Y concibió por obra del Espíritu Santo.\n(Ave María)\n\nV. He aquí la esclava del Señor.\nR. Hágase en mí según tu palabra.\n(Ave María)\n\nV. Y el Verbo se hizo carne.\nR. Y habitó entre nosotros.\n(Ave María)\n\nV. Ruega por nosotros, Santa Madre de Dios.\nR. Para que seamos dignos de alcanzar las promesas de Jesucristo.\n\nOración: Te suplicamos, Señor, que derrames tu gracia en nuestras almas, para que los que, por el anuncio del Ángel, hemos conocido la encarnación de tu Hijo Jesucristo, por su Pasión y Cruz seamos llevados a la gloria de su Resurrección. Por el mismo Jesucristo Nuestro Señor. Amén.`
  },
  {
    id: 'novena-gracia',
    title: 'Novena de la Gracia (San Francisco Javier)',
    category: PrayerCategory.NOVENA,
    isNovena: true,
    duration: '9 Días',
    content: `¡Oh amadísimo San Francisco Javier! Con vuestros méritos y los de todos los santos, y especialmente con los de vuestra Madre la Iglesia, me postro ante la Majestad Divina...\n\n(Rezar esta oración durante 9 días consecutivos pidiendo una gracia especial).`
  },
  {
    id: 'novena-inmaculada',
    title: 'Novena a la Inmaculada Concepción',
    category: PrayerCategory.NOVENA,
    isNovena: true,
    duration: '9 Días',
    content: `Virgen Purísima, concebida sin pecado original desde el primer instante de tu ser, ruega por nosotros que recurrimos a ti...\n\n(Rezar durante los 9 días previos al 8 de diciembre o en cualquier momento de necesidad).`
  },
  {
    id: 'san-miguel',
    title: 'A San Miguel Arcángel',
    category: PrayerCategory.SAINTS,
    content: `San Miguel Arcángel, defiéndenos en la lucha. Sé nuestro amparo contra la perversidad y acechanzas del demonio. Que Dios manifieste sobre él su poder, es nuestra humilde súplica. Y tú, oh Príncipe de la Milicia Celestial, con el poder que Dios te ha conferido, arroja al infierno a Satanás, y a los demás espíritus malignos que vagan por el mundo para la perdición de las almas. Amén.`
  }
];