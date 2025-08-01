// Base de datos de obras de arte
const obras = [
  {
    id: 1,
    titulo: "Atardecer en el bosque",
    imagen: "imagenes/dibu1.jpg",
    categoria: "paisaje",
    descripcion: "Un dibujo que captura la serenidad de un atardecer entre los árboles, usando técnicas de sombreado para crear profundidad y atmósfera. Esta obra representa mi fascinación por los momentos de transición del día, donde la luz dorada se filtra entre las hojas creando un ambiente mágico y contemplativo.",
    tecnica: "Lápiz grafito y carboncillo",
    año: "2024",
    dimensiones: "30x40 cm",
    disponible: true,
    precio: "$150",
    tags: ["naturaleza", "atardecer", "bosque", "grafito"]
  },
  {
    id: 2,
    titulo: "Retrato en grafito",
    imagen: "imagenes/dibu2.jpg",
    categoria: "retrato",
    descripcion: "Retrato detallado realizado completamente a lápiz grafito, enfocándose en las expresiones faciales y los juegos de luz y sombra. Este trabajo explora la profundidad emocional que se puede capturar através del contraste y la técnica del claroscuro, buscando transmitir la personalidad única del modelo.",
    tecnica: "Lápiz grafito",
    año: "2024",
    dimensiones: "25x35 cm",
    disponible: false,
    precio: "$200",
    tags: ["retrato", "grafito", "claroscuro", "expresión"]
  },
  {
    id: 3,
    titulo: "Composición abstracta",
    imagen: "imagenes/dibu3.jpg", // Placeholder - reemplaza con tu imagen
    categoria: "abstracto",
    descripcion: "Exploración de formas y texturas abstractas que juegan con la percepción del espectador. Esta pieza busca romper con la representación tradicional para crear un diálogo puramente visual basado en el ritmo, el movimiento y la armonía de las formas geométricas.",
    tecnica: "Técnica mixta",
    año: "2024",
    dimensiones: "40x50 cm",
    disponible: true,
    precio: "$180",
    tags: ["abstracto", "formas", "geometría", "experimental"]
  },
  {
    id: 4,
    titulo: "Arte digital experimental",
    imagen: "imagenes/dibu4.jpg", // Placeholder - reemplaza con tu imagen
    categoria: "digital",
    descripcion: "Creación digital que combina técnicas tradicionales con herramientas digitales modernas. Esta obra representa la fusión entre lo clásico y lo contemporáneo, explorando nuevas posibilidades expresivas a través de la tecnología sin perder la esencia artística tradicional.",
    tecnica: "Arte digital",
    año: "2024",
    dimensiones: "Digital - Variable",
    disponible: true,
    precio: "$120",
    tags: ["digital", "experimental", "tecnología", "fusión"]
  },
  {
    id: 5,
    titulo: "Arte digital experimental",
    imagen: "imagenes/dibu5.jpg", // Placeholder - reemplaza con tu imagen
    categoria: "digital",
    descripcion: "Creación digital que combina técnicas tradicionales con herramientas digitales modernas. Esta obra representa la fusión entre lo clásico y lo contemporáneo, explorando nuevas posibilidades expresivas a través de la tecnología sin perder la esencia artística tradicional.",
    tecnica: "Arte digital",
    año: "2024",
    dimensiones: "Digital - Variable",
    disponible: true,
    precio: "$120",
    tags: ["digital", "experimental", "tecnología", "fusión"]
  },
  {
    id: 6,
    titulo: "Arte digital experimental",
    imagen: "imagenes/dibu6.jpg", // Placeholder - reemplaza con tu imagen
    categoria: "digital",
    descripcion: "Creación digital que combina técnicas tradicionales con herramientas digitales modernas. Esta obra representa la fusión entre lo clásico y lo contemporáneo, explorando nuevas posibilidades expresivas a través de la tecnología sin perder la esencia artística tradicional.",
    tecnica: "Arte digital",
    año: "2024",
    dimensiones: "Digital - Variable",
    disponible: true,
    precio: "$120",
    tags: ["digital", "experimental", "tecnología", "fusión"]
  },
  {
    id: 7,
    titulo: "Arte digital experimental",
    imagen: "imagenes/dibu7.jpg", // Placeholder - reemplaza con tu imagen
    categoria: "digital",
    descripcion: "Creación digital que combina técnicas tradicionales con herramientas digitales modernas. Esta obra representa la fusión entre lo clásico y lo contemporáneo, explorando nuevas posibilidades expresivas a través de la tecnología sin perder la esencia artística tradicional.",
    tecnica: "Arte digital",
    año: "2024",
    dimensiones: "Digital - Variable",
    disponible: true,
    precio: "$120",
    tags: ["digital", "experimental", "tecnología", "fusión"]
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