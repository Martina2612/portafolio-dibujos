// Base de datos de obras de arte
const obras = [
  {
    id: 1,
    titulo: "Bubble Cat",
    imagen: "imagenes/dibu1.jpg",
    descripcion: "Inspired by the works of M.C. Escher. Made with fibers and black markers of various strokes."
  },
  {
    id: 2,
    titulo: "Rose",
    imagen: "imagenes/dibu2.jpg",
    descripcion: "An open rose with two buds, painted with watercolors in soft pink and green tones. Clean and delicate technique."
  },
  {
    id: 3,
    titulo: "idk",
    imagen: "imagenes/dibu3.jpg",
    descripcion: "Realistic portrait of a long-haired cat. The fur is carefully crafted using a pencil technique."
  },
  {
    id: 4,
    titulo: "Chihiro",
    imagen: "imagenes/dibu4.jpg",
    descripcion: "Scene from Hayao Miyazaki's film Spirited Away. Done in watercolor."
  },
  {
    id: 5,
    titulo: "Hippocampus",
    imagen: "imagenes/dibu5.jpg",
    descripcion: "Done in ocean blue graphite. The hippocampus is a mythical creature that is half horse and half fish, often depicted in Greek mythology as a sea horse."
  },
  {
    id: 6,
    titulo: "Kiki",
    imagen: "imagenes/dibu6.jpg",
    descripcion: "Portrait of a scene from Hayao Miyazaki's film 'Kiki's Delivery', using different materials such as acrylics and watercolors."
  },
  {
    id: 7,
    titulo: "Orchids",
    imagen: "imagenes/dibu7.jpg",
    descripcion: ""
  },
  {
    id: 8,
    titulo: "Michelangelo",
    imagen: "imagenes/dibu8.jpg",
    descripcion: "Detailed study of Michelangelo's David sculpture, done in pencil. The shadows and volumes are carefully modeled, reflecting the power of Renaissance art."
  },
  {
    id: 9,
    titulo: "Koi Fish",
    imagen: "imagenes/dibu9.jpg",
    descripcion: "The Koi fish is a symbol of perseverance and tenacity as it swims upstream against the current. Legend has it that upon reaching the top of the waterfall, the Koi fish turns into a dragon after its journey against the current."
  },
  {
    id: 10,
    titulo: "Over the Garden Wall",
    imagen: "imagenes/dibu10.jpg",
    descripcion: "Done in watercolor."
  },
  {
    id: 11,
    titulo: "Hand Study",
    imagen: "imagenes/dibu11.jpg",
    descripcion: "Series of anatomical sketches in terracotta tones. Each hand conveys a different posture: tension, calm, communication."
  },
  {
    id: 12,
    titulo: "Girl with a Pearl Earring",
    imagen: "imagenes/dibu12.jpg",
    descripcion: "Graphite sketch inspired by Johannes Vermeer's painting."
  },
  {
    id: 13,
    titulo: "Aristocratic Frog",
    imagen: "imagenes/dibu13.jpg",
    descripcion: ""
  },
  {
    id: 14,
    titulo: "Birds in the wild",
    imagen: "imagenes/dibu14.jpg",
    descripcion: "Observing different birds in nature"
  },
  {
    id: 15,
    titulo: "Notre Dame",
    imagen: "imagenes/dibu15.jpg",
    descripcion: "Notre Dame Cathedral in Paris, France. I created this piece after reading Notre Dame de Paris by Victor Hugo, one of my favorite books."
  },
  {
    id: 16,
    titulo: "The Burden of Humanity",
    imagen: "imagenes/dibu16.jpg",
    descripcion: "Done in graphite. It evokes struggle or balance, inspired by Leonardo da Vinci's Vitruvian Man combined with the Fibonacci spiral."
  },
  {
    id: 17,
    titulo: "Konbini",
    imagen: "imagenes/dibu17.jpg",
    descripcion: "Small shop in Tokyo, done in watercolor. The scene captures the essence of Japanese convenience stores, known as 'konbini', which are ubiquitous in urban areas."
  },
  {
    id: 18,
    titulo: "Horse",
    imagen: "imagenes/dibu18.jpg",
    descripcion: "Different perspectives and movements."
  },
  {
    id: 19,
    titulo: "Woman's portrait",
    imagen: "imagenes/dibu19.jpg",
    descripcion: "What is she looking?"
  },
  {
    id: 20,
    titulo: "Road to the Andes",
    imagen: "imagenes/dibu20.jpg",
    descripcion: "Mountain landscape with a path, trees, and snow-capped hills. Done in black ink."
  },
  {
    id: 21,
    titulo: "Fusion",
    imagen: "imagenes/dibu21.jpg",
    descripcion: "The neurons of the heart are the secret memory of the soul."
  },
  {
    id: 22,
    titulo: "Elephant",
    imagen: "imagenes/dibu22.jpg",
    descripcion: "Different perspectives of my favorite animal."
  },
  {
    id: 23,
    titulo: "Woman waiting",
    imagen: "imagenes/dibu23.jpg",
    descripcion: "Artistic expression that reflects intense emotions through a woman's gaze and colors."
  }
];


// Función para obtener una obra por ID
function getObraById(id) {
  return obras.find(obra => obra.id === parseInt(id));
}

// Función para obtener todas las obras de una categoría
function getObrasByCategoria(categoria) {
  if (categoria === 'all') return obras;
  return obras.filter(obra => obra.categoria === categoria);
}

// Función para obtener la obra siguiente
function getNextObra(currentId) {
  const currentIndex = obras.findIndex(obra => obra.id === parseInt(currentId));
  if (currentIndex === -1 || currentIndex === obras.length - 1) return null;
  return obras[currentIndex + 1];
}

// Función para obtener la obra anterior
function getPrevObra(currentId) {
  const currentIndex = obras.findIndex(obra => obra.id === parseInt(currentId));
  if (currentIndex === -1 || currentIndex === 0) return null;
  return obras[currentIndex - 1];
}

// Función para obtener obras relacionadas (misma categoría)
function getObrasRelacionadas(obraId, categoria, limit = 3) {
  return obras
    .filter(obra => obra.id !== parseInt(obraId) && obra.categoria === categoria)
    .slice(0, limit);
}