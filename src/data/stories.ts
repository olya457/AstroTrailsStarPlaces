export interface Article {
  id: string;
  title: string;
  preview: string;
  content: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
}

export const ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Why Some Places See More Stars Than Others',
    preview: 'When people imagine the night sky, they often picture a sky filled with thousands of stars stretching across the darkness. Yet for many people living in large cities, the sky looks almost empty.',
    content: `When people imagine the night sky, they often picture a sky filled with thousands of stars stretching across the darkness. Yet for many people living in large cities, the sky looks almost empty. The difference between these two experiences is not caused by the stars themselves — it is caused by the environment on Earth.

One of the most important factors is light pollution. Artificial light from street lamps, buildings, and highways brightens the sky and hides the faint light coming from distant stars. Even a moderately sized town can wash out much of the natural sky, leaving only the brightest stars visible.

Another factor is atmospheric clarity. Dust, humidity, and pollution in the air scatter light and make the sky appear hazy. Regions with dry climates and stable air — such as deserts or high mountains — tend to offer much clearer views of the stars.

Altitude also plays an important role. When you travel to higher elevations, you look through less of Earth's atmosphere. Observatories are often built on mountain peaks for this reason, allowing telescopes to see the universe with fewer atmospheric distortions.

Finally, geographic isolation matters. Remote locations far from major cities often have the darkest skies on Earth. These places allow the faint glow of the Milky Way to appear clearly and reveal thousands of stars that remain hidden in urban environments.

For anyone hoping to experience a truly spectacular night sky, traveling to a dark location may reveal a completely different universe than the one seen from a city.`,
  },
  {
    id: '2',
    title: 'What Is the Milky Way?',
    preview: 'The Milky Way is the galaxy that contains our solar system. It is a vast spiral structure made of hundreds of billions of stars, clouds of gas, and mysterious dark matter.',
    content: `The Milky Way is the galaxy that contains our solar system. It is a vast spiral structure made of hundreds of billions of stars, clouds of gas, and mysterious dark matter. When we look at the night sky, the glowing band known as the Milky Way is actually our view from inside this enormous galaxy.

Because we are located within it, we see the galaxy from the inside rather than from above. The stars we observe are part of a thin disk that stretches across the sky like a luminous river of light.

The Milky Way is estimated to be about 100,000 light-years across. This means that light traveling at the fastest speed possible would need one hundred thousand years to cross the galaxy from one side to the other.

Our solar system lies in a quiet region of the galaxy called the Orion Arm, far from the crowded center. This location may be one reason life had time to develop on Earth without constant exposure to extreme cosmic radiation.

On very dark nights far from city lights, the Milky Way becomes clearly visible as a bright band stretching across the sky. What appears as a soft glow is actually the combined light of millions of distant stars.

Looking at the Milky Way reminds us that our Sun is just one of many stars in a vast cosmic structure.`,
  },
  {
    id: '3',
    title: 'How Far Away Are the Stars?',
    preview: 'Stars appear close together when we look at the night sky, but in reality they are separated by enormous distances. These distances are so vast that ordinary units like kilometers quickly become difficult to imagine.',
    content: `Stars appear close together when we look at the night sky, but in reality they are separated by enormous distances. These distances are so vast that ordinary units like kilometers quickly become difficult to imagine.

To describe cosmic distances, astronomers often use a unit called a light-year. A light-year is the distance light travels in one year. Since light moves at about 300,000 kilometers per second, a single light-year equals roughly 9.46 trillion kilometers.

The nearest star beyond our Sun is Proxima Centauri, which lies about 4.24 light-years away. Even traveling at the speed of the fastest spacecraft ever launched by humans, reaching that star would take tens of thousands of years.

More distant stars can lie hundreds or thousands of light-years away. Entire galaxies are separated by millions of light-years.

These enormous distances reveal one of the most astonishing truths about the universe: the stars we see tonight may be shining light that began its journey long before human civilization even existed.`,
  },
  {
    id: '4',
    title: 'The Science of Dark Skies',
    preview: 'A dark sky is more than simply a sky without clouds. It refers to a night sky free from excessive artificial light, allowing natural celestial objects to remain visible.',
    content: `A dark sky is more than simply a sky without clouds. It refers to a night sky free from excessive artificial light, allowing natural celestial objects to remain visible.

In recent decades, scientists have become increasingly concerned about light pollution. Artificial lighting not only hides stars from view but can also affect ecosystems, animal behavior, and even human health.

To protect natural night environments, many regions have created Dark Sky Parks and Reserves. These areas carefully regulate outdoor lighting to minimize unnecessary brightness and preserve the visibility of the stars.

Dark sky locations are valuable for both scientific research and tourism. Astronomers rely on dark environments to observe faint celestial objects, while travelers visit these locations to experience the beauty of a truly star-filled sky.

Standing beneath a dark sky can be a powerful experience. Thousands of stars become visible, the Milky Way stretches overhead, and the universe suddenly feels much larger than it does in everyday life.`,
  },
  {
    id: '5',
    title: 'Why the Night Sky Changes Through the Year',
    preview: 'If you observe the sky regularly, you may notice that different constellations appear during different seasons. This change occurs because Earth is constantly moving through space as it orbits the Sun.',
    content: `If you observe the sky regularly, you may notice that different constellations appear during different seasons. This change occurs because Earth is constantly moving through space as it orbits the Sun.

As our planet travels around the Sun, the direction we face at night gradually shifts. During winter nights, Earth faces one region of space, while summer nights reveal another.

This movement causes constellations such as Orion to dominate winter skies, while others like Scorpius become visible during summer months.

The Earth's tilt also plays an important role. Because the planet is tilted by about 23.5 degrees, different parts of the sky become visible depending on where you are located on Earth.

Observers in the Northern Hemisphere see different constellations than observers in the Southern Hemisphere. Some constellations never appear in certain regions of the world.

The shifting sky creates a cosmic calendar that has guided farmers, navigators, and explorers for thousands of years.`,
  },
  {
    id: '6',
    title: 'What Happens When a Star Dies?',
    preview: 'Stars may appear eternal, but they actually have life cycles lasting millions or billions of years. Like living systems, stars are born, evolve, and eventually reach an end.',
    content: `Stars may appear eternal, but they actually have life cycles lasting millions or billions of years. Like living systems, stars are born, evolve, and eventually reach an end.

Stars form inside enormous clouds of gas and dust called nebulae. Gravity slowly pulls this material together until a new star ignites at the center of the collapsing cloud.

Over time, stars burn through their nuclear fuel. Small stars like our Sun will eventually expand into red giants, shedding their outer layers and forming glowing structures called planetary nebulae.

More massive stars experience a far more dramatic ending. When they run out of fuel, their cores collapse and trigger a powerful explosion known as a supernova. For a brief time, this explosion can shine brighter than an entire galaxy.

After a supernova, the star's remains may form a neutron star or even a black hole — objects with gravity so strong that not even light can escape.

The life and death of stars are essential to the universe. Elements such as carbon, oxygen, and iron are created inside stars and scattered into space when they die, eventually forming new stars, planets, and possibly life itself.`,
  },
  {
    id: '7',
    title: 'How Observatories Explore the Universe',
    preview: 'Observatories are places where humans extend their vision far beyond the limits of the naked eye. Using powerful telescopes and sensitive instruments, astronomers can observe objects billions of light-years away.',
    content: `Observatories are places where humans extend their vision far beyond the limits of the naked eye. Using powerful telescopes and sensitive instruments, astronomers can observe objects that lie millions or even billions of light-years away.

Most modern observatories are built in remote locations such as mountain peaks, deserts, or isolated islands. These places offer clear air, minimal light pollution, and stable atmospheric conditions that allow telescopes to capture sharper images of the sky.

Telescopes do not only collect visible light. Many observatories also study radio waves, infrared radiation, ultraviolet light, and even high-energy X-rays coming from space. Each type of observation reveals different information about stars, galaxies, and cosmic events.

By combining data from many observatories across the world — and even from telescopes in space — scientists build a deeper understanding of how the universe works.

The discoveries made at observatories have helped answer some of humanity's most profound questions: how stars are born, how galaxies evolve, and whether other worlds might host life.`,
  },
  {
    id: '8',
    title: 'The Mystery of Black Holes',
    preview: 'Black holes are among the most mysterious objects in the universe. They form when extremely massive stars collapse under their own gravity after exhausting their nuclear fuel.',
    content: `Black holes are among the most mysterious objects in the universe. They form when extremely massive stars collapse under their own gravity after exhausting their nuclear fuel.

The gravity of a black hole becomes so powerful that nothing can escape once it crosses a boundary called the event horizon. Not even light can escape, which is why black holes appear completely dark.

Although black holes themselves cannot be seen directly, astronomers can detect their presence by observing how they affect nearby matter. Gas and dust falling toward a black hole can heat up and glow brightly before disappearing beyond the event horizon.

Some black holes are small remnants of individual stars, while others are supermassive giants located at the centers of galaxies. These enormous black holes can contain millions or even billions of times the mass of our Sun.

Despite their intimidating nature, black holes play an important role in shaping galaxies and influencing cosmic evolution.`,
  },
  {
    id: '9',
    title: 'What Are Nebulae?',
    preview: 'Nebulae are vast clouds of gas and dust drifting through space. They are some of the most colorful and beautiful objects in the universe, often glowing in shades of red, blue, and purple.',
    content: `Nebulae are vast clouds of gas and dust drifting through space. They are some of the most colorful and beautiful objects in the universe, often glowing in shades of red, blue, and purple.

Some nebulae are regions where new stars are forming. Inside these stellar nurseries, gravity slowly gathers gas and dust until new stars ignite. Other nebulae form when dying stars release their outer layers into space.

There are several types of nebulae, including emission nebulae, reflection nebulae, and dark nebulae. Each type interacts with light in a different way.

Emission nebulae glow because nearby stars energize their gas. Reflection nebulae shine by reflecting starlight like cosmic mirrors. Dark nebulae appear as shadows because dense dust blocks the light behind them.

These immense clouds play a key role in the cosmic cycle of matter, where stars are born, live, and eventually return their material to space.`,
  },
  {
    id: '10',
    title: 'Why Stars Have Different Colors',
    preview: 'Not all stars shine with the same color. Some appear blue or white, while others glow yellow, orange, or red. These colors reveal important information about the temperature of each star.',
    content: `Not all stars shine with the same color. Some appear blue or white, while others glow yellow, orange, or red. These colors reveal important information about the temperature of each star.

Hotter stars emit more blue and white light, making them appear brilliant and intense. Cooler stars produce more red or orange light, giving them a warmer appearance.

For example, Betelgeuse shines with a reddish glow because its surface temperature is relatively cool compared with many other stars. On the other hand, bright stars such as Sirius appear white or slightly bluish because they are much hotter.

Our Sun lies somewhere in the middle, producing a yellow-white light that supports life on Earth.

Star colors help astronomers classify stars and understand their age, size, and stage of development within the stellar life cycle.`,
  },
  {
    id: '11',
    title: 'The Beauty of Meteor Showers',
    preview: 'Meteor showers occur when Earth passes through streams of dust and debris left behind by comets. As these tiny particles enter Earth\'s atmosphere, they burn up and produce streaks of light across the sky.',
    content: `Meteor showers occur when Earth passes through streams of dust and debris left behind by comets. As these tiny particles enter Earth's atmosphere, they burn up and produce streaks of light across the sky.

These glowing trails are commonly called shooting stars, although they are not actually stars. Most meteor particles are no larger than grains of sand, yet they produce brilliant flashes as they vaporize in the upper atmosphere.

Certain meteor showers occur at the same time each year because Earth repeatedly crosses the same debris streams during its orbit around the Sun. Well-known examples include the Perseids, Geminids, and Leonids.

Watching a meteor shower under a dark sky can be a magical experience. On active nights, dozens of meteors may streak across the sky every hour.`,
  },
  {
    id: '12',
    title: 'How Astronomers Discover New Planets',
    preview: 'For centuries, people wondered whether planets existed around other stars. Today we know that the universe contains thousands of exoplanets — planets orbiting stars beyond our solar system.',
    content: `For centuries, people wondered whether planets existed around other stars. Today we know that the universe contains thousands of exoplanets — planets orbiting stars beyond our solar system.

Astronomers often discover these planets by observing how a star's brightness changes over time. When a planet passes in front of its star from our perspective, it causes a tiny dip in the star's light. This method is known as the transit method.

Another technique measures the slight wobble of a star caused by the gravitational pull of an orbiting planet. Even though the planet itself may not be visible, its influence can reveal its existence.

Some exoplanets are massive gas giants, while others may be rocky worlds similar to Earth. A few even orbit within regions where conditions might allow liquid water to exist.

Each new discovery expands our understanding of planetary systems and raises fascinating questions about the possibility of life elsewhere in the universe.`,
  },
  {
    id: '13',
    title: 'The Quietest Places on Earth to See the Stars',
    preview: 'Some places on Earth still offer a night sky that feels almost untouched by modern civilization. Far from cities and highways, these locations allow the darkness to return and the stars to shine in extraordinary numbers.',
    content: `Some places on Earth still offer a night sky that feels almost untouched by modern civilization. Far from cities and highways, these locations allow the darkness to return and the stars to shine in extraordinary numbers.

Remote deserts, high mountain plateaus, isolated islands, and protected dark sky parks are among the best environments for observing the night sky. In these places, artificial light is limited or carefully controlled, allowing the faint glow of distant stars to remain visible.

These locations often reveal the Milky Way in breathtaking detail. What appears as a faint glow in many regions becomes a bright river of stars stretching across the sky.

Visiting such places can feel like stepping into a different era — one where the night sky was a constant presence in daily life. For travelers and astronomers alike, these dark landscapes offer a rare chance to reconnect with the universe.`,
  },
  {
    id: '14',
    title: 'The Story Behind Constellations',
    preview: 'For thousands of years, people have looked at the night sky and imagined patterns among the stars. These patterns became the constellations — groups of stars connected through stories, mythology, and cultural traditions.',
    content: `For thousands of years, people have looked at the night sky and imagined patterns among the stars. These patterns became the constellations — groups of stars connected through stories, mythology, and cultural traditions.

Ancient civilizations used constellations as a way to explain the sky and track the passage of time. Farmers relied on certain star patterns to predict seasons, while sailors used them for navigation across open oceans.

Many of the constellations recognized today come from Greek mythology. Orion the hunter, Cassiopeia the queen, and Leo the lion are just a few examples that have survived for centuries.

However, other cultures created their own star stories as well. Indigenous communities across the world developed constellations based on animals, ancestors, or natural elements important to their traditions.

Although the stars in a constellation may appear close together, they are often separated by enormous distances in space. The shapes we see are simply the result of perspective from Earth.`,
  },
  {
    id: '15',
    title: 'Why the Sky Looks Different Around the World',
    preview: 'The appearance of the night sky changes depending on where you are on Earth. Observers in the Northern Hemisphere see a different set of stars than those living in the Southern Hemisphere.',
    content: `The appearance of the night sky changes depending on where you are on Earth. Observers in the Northern Hemisphere see a different set of stars than those living in the Southern Hemisphere.

This difference occurs because Earth is a sphere. As you travel north or south, the horizon shifts and reveals new parts of the sky while hiding others.

For example, the Southern Cross constellation is clearly visible in the southern half of the planet but cannot be seen from most northern regions. Meanwhile, the North Star, Polaris, remains visible only in the Northern Hemisphere.

Near the equator, observers can see portions of both hemispheres' skies during the year. This makes equatorial regions especially interesting for stargazing.

Traveling to different latitudes can therefore feel like visiting entirely new skies filled with unfamiliar constellations and celestial landmarks.`,
  },
  {
    id: '16',
    title: 'The Largest Structures in the Universe',
    preview: 'The universe is filled with structures of extraordinary scale. While planets and stars may seem enormous, they are only small components within much larger cosmic systems.',
    content: `The universe is filled with structures of extraordinary scale. While planets and stars may seem enormous, they are only small components within much larger cosmic systems.

Stars gather into galaxies, which may contain hundreds of billions of stars. Galaxies themselves often form clusters, bound together by gravity across vast regions of space.

Even beyond these clusters lie gigantic networks known as cosmic filaments. These immense structures form a web-like pattern across the universe, connecting galaxy clusters through enormous strands of matter.

Between these filaments are enormous empty regions called cosmic voids, where very few galaxies exist.

This large-scale structure of the universe resembles a vast cosmic web stretching across billions of light-years. It reveals that the universe is not randomly scattered but organized into immense patterns far beyond human imagination.`,
  },
  {
    id: '17',
    title: 'The Search for Life Beyond Earth',
    preview: 'One of the most exciting questions in modern science is whether life exists anywhere beyond our planet. Astronomers and scientists have been searching for answers through the study of planets orbiting other stars.',
    content: `One of the most exciting questions in modern science is whether life exists anywhere beyond our planet. Astronomers and scientists have been searching for answers through the study of planets orbiting other stars.

These planets, called exoplanets, come in many different forms. Some are giant gas worlds larger than Jupiter, while others are rocky planets that may resemble Earth.

Scientists pay special attention to planets located within a region called the habitable zone. In this zone, temperatures could allow liquid water to exist on the planet's surface — one of the key ingredients for life as we know it.

Space telescopes and powerful observatories continue to discover new planetary systems every year. Some of these planets may eventually become targets for future exploration.

Although no confirmed evidence of life beyond Earth has yet been found, the search continues to expand our understanding of the universe and our place within it.`,
  },
  {
    id: '18',
    title: 'Why the Universe Is Expanding',
    preview: 'In the early twentieth century, astronomers made a surprising discovery: distant galaxies are moving away from us. This observation revealed that the universe itself is expanding.',
    content: `In the early twentieth century, astronomers made a surprising discovery: distant galaxies are moving away from us. This observation revealed that the universe itself is expanding.

The expansion began with an event known as the Big Bang, which occurred approximately 13.8 billion years ago. Since that moment, space itself has been stretching, carrying galaxies farther apart over time.

The farther away a galaxy is from us, the faster it appears to move away. This pattern helped scientists understand that expansion is happening everywhere in the universe, not just in our region of space.

Modern observations suggest that the expansion is actually accelerating due to a mysterious force called dark energy. Although scientists do not yet fully understand this phenomenon, it plays a major role in shaping the future of the cosmos.

The expanding universe reminds us that space is not static — it is dynamic, evolving, and far more complex than early astronomers once imagined.`,
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: '1',
    question: 'Which desert in Chile is famous for some of the clearest night skies on Earth?',
    options: ['Sahara Desert', 'Atacama Desert', 'Mojave Desert', 'Gobi Desert'],
    correct: 1,
  },
  {
    id: '2',
    question: 'What is the name of the galaxy that contains our solar system?',
    options: ['Andromeda Galaxy', 'Whirlpool Galaxy', 'Milky Way', 'Sombrero Galaxy'],
    correct: 2,
  },
  {
    id: '3',
    question: 'Which cosmic object is known as a vast cloud where new stars are born?',
    options: ['Comet', 'Nebula', 'Asteroid', 'Moon'],
    correct: 1,
  },
  {
    id: '4',
    question: 'Which star is the brightest in Earth\'s night sky?',
    options: ['Betelgeuse', 'Polaris', 'Sirius', 'Vega'],
    correct: 2,
  },
  {
    id: '5',
    question: 'What unit is commonly used to measure the distance between stars?',
    options: ['Kilogram', 'Light-year', 'Celsius', 'Volt'],
    correct: 1,
  },
  {
    id: '6',
    question: 'Which location is especially famous for observing the Northern Lights?',
    options: ['Tromsø', 'Lake Tekapo', 'Mauna Kea', 'Wadi Rum'],
    correct: 0,
  },
  {
    id: '7',
    question: 'What are the Pleiades best described as?',
    options: ['A black hole', 'A ringed planet', 'An open star cluster', 'A red giant star'],
    correct: 2,
  },
  {
    id: '8',
    question: 'Which mountain in Hawaii is one of the world\'s most important astronomical observing sites?',
    options: ['Mount Etna', 'Mauna Kea', 'Mount Fuji', 'Kilimanjaro'],
    correct: 1,
  },
  {
    id: '9',
    question: 'What do we call a "shooting star"?',
    options: ['A dying planet', 'A meteor burning in the atmosphere', 'A newborn star', 'A glowing satellite'],
    correct: 1,
  },
  {
    id: '10',
    question: 'Which galaxy is the nearest major galaxy to the Milky Way?',
    options: ['Centaurus A', 'Whirlpool Galaxy', 'Andromeda Galaxy', 'Triangulum Galaxy'],
    correct: 2,
  },
  {
    id: '11',
    question: 'Why do observatories often stand on mountains?',
    options: ['Mountains make stars brighter', 'There is less atmosphere and less light pollution', 'Meteors land there more often', 'The Moon looks larger from high places'],
    correct: 1,
  },
  {
    id: '12',
    question: 'Which constellation contains the famous Orion Nebula?',
    options: ['Cassiopeia', 'Orion', 'Scorpius', 'Lyra'],
    correct: 1,
  },
  {
    id: '13',
    question: 'Which protected region in New Zealand is known for extraordinary dark skies?',
    options: ['Fiordland Coastal Reserve', 'Aoraki Mackenzie Dark Sky Reserve', 'Blue Lake National Park', 'Southern Moon Valley'],
    correct: 1,
  },
  {
    id: '14',
    question: 'What is Polaris better known as?',
    options: ['Evening Star', 'Red Giant', 'North Star', 'Falling Star'],
    correct: 2,
  },
  {
    id: '15',
    question: 'Which planet is most famous for its rings?',
    options: ['Mars', 'Jupiter', 'Saturn', 'Neptune'],
    correct: 2,
  },
  {
    id: '16',
    question: 'What makes dark sky places so special for stargazing?',
    options: ['Stronger gravity', 'Brighter air', 'Less artificial light', 'Warmer nights'],
    correct: 2,
  },
  {
    id: '17',
    question: 'Which desert location in Jordan is often called the "Valley of the Moon"?',
    options: ['Petra Basin', 'Wadi Rum', 'Sinai Sands', 'Rub\'al Khali'],
    correct: 1,
  },
  {
    id: '18',
    question: 'What kind of object is Betelgeuse?',
    options: ['Spiral galaxy', 'Red supergiant star', 'Planetary nebula', 'Ice moon'],
    correct: 1,
  },
  {
    id: '19',
    question: 'Which celestial object is famous for being our closest star after the Sun?',
    options: ['Sirius', 'Proxima Centauri', 'Vega', 'Aldebaran'],
    correct: 1,
  },
  {
    id: '20',
    question: 'What is the main reason the Milky Way looks like a glowing band across the sky?',
    options: ['It is a single giant cloud', 'We are viewing our galaxy from inside it', 'It reflects sunlight at night', 'It is made only of nearby stars'],
    correct: 1,
  },
  {
    id: '21',
    question: 'Which type of cosmic object is the Andromeda Galaxy?',
    options: ['Spiral galaxy', 'Red giant star', 'Open cluster', 'Planetary nebula'],
    correct: 0,
  },
  {
    id: '22',
    question: 'What are the Magellanic Clouds?',
    options: ['Bright comets near Earth', 'Small neighboring galaxies', 'Rings around Saturn', 'Storm systems on Jupiter'],
    correct: 1,
  },
  {
    id: '23',
    question: 'Which place is known for stargazing above volcanic landscapes in the Canary Islands?',
    options: ['Lake Tekapo', 'Teide National Park', 'Joshua Tree', 'Cherry Springs'],
    correct: 1,
  },
  {
    id: '24',
    question: 'What usually causes a meteor shower?',
    options: ['Exploding stars near Earth', 'Earth passing through comet debris', 'The Moon reflecting more sunlight', 'Solar wind hitting planets'],
    correct: 1,
  },
  {
    id: '25',
    question: 'Which object is known as the North Star because it stays nearly fixed in the northern sky?',
    options: ['Sirius', 'Betelgeuse', 'Polaris', 'Antares'],
    correct: 2,
  },
  {
    id: '26',
    question: 'Why do stars appear to twinkle more than planets?',
    options: ['Stars are closer to Earth', 'Planets create their own light differently', 'Starlight is more affected by Earth\'s atmosphere', 'Planets never move in the sky'],
    correct: 2,
  },
  {
    id: '27',
    question: 'Which type of place is most likely to offer the darkest skies for stargazing?',
    options: ['A large coastal city', 'A busy highway stop', 'A remote desert plateau', 'A brightly lit ski resort'],
    correct: 2,
  },
  {
    id: '28',
    question: 'What makes Saturn one of the most loved telescope targets in the night sky?',
    options: ['Its blue color', 'Its powerful meteor showers', 'Its visible ring system', 'Its glowing tail'],
    correct: 2,
  },
  {
    id: '29',
    question: 'Why does the night sky look different in different parts of the world?',
    options: ['Stars move closer to Earth', 'Earth has different atmospheres in each country', 'Your position on Earth changes which part of the sky you can see', 'The Moon changes the stars each season'],
    correct: 2,
  },
  {
    id: '30',
    question: 'What do we call regions where conditions might allow liquid water to exist on an exoplanet?',
    options: ['Dark zones', 'Habitable zones', 'Frost lines', 'Plasma rings'],
    correct: 1,
  },
];