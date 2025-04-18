import axios from 'axios';

// Base URL for mock API in development
const API_URL = 'https://my-json-server.typicode.com/your-repository/pet-adoption-api';

// Create mock data for pets - usando apenas cães e gatos com localização em São Paulo
const createMockPets = () => {
  const petTypes = ['dog', 'cat'];
  const statuses = ['disponível', 'pendente', 'adotado'];
  const sizes = ['pequeno', 'médio', 'grande'];
  const genders = ['Macho', 'Fêmea'];
  const locations = [
    'São Paulo - Zona Sul',
    'São Paulo - Zona Norte',
    'São Paulo - Zona Leste',
    'São Paulo - Zona Oeste',
    'São Paulo - Centro',
    'Guarulhos, SP',
    'Campinas, SP',
    'Osasco, SP',
    'Santo André, SP'
  ];

  const dogBreeds = ['Labrador Retriever', 'Pastor Alemão', 'Golden Retriever', 'Bulldog', 'Beagle', 'Poodle', 'Husky', 'Vira-lata'];
  const catBreeds = ['Siamês', 'Persa', 'Maine Coon', 'Ragdoll', 'Bengal', 'Sphynx', 'SRD (Sem Raça Definida)', 'Angorá'];

  // Lista de nomes para cães e gatos
  const dogNames = [
    'Thor', 'Luna', 'Rex', 'Mel', 'Bob', 'Nina', 'Max', 'Bidu', 
    'Tóbi', 'Lilica', 'Billy', 'Pandora', 'Chico', 'Pipoca', 'Duke',
    'Cacau', 'Fred', 'Amora', 'Simba', 'Mila', 'Bolinha', 'Maggie',
    'Luke', 'Pérola', 'Teco', 'Princesa', 'Ozzy', 'Pucca', 'Logan',
    'Totó', 'Kika', 'Zé', 'Lulu', 'Nala', 'Rocky', 'Toddy', 'Charlie',
    'Kiara', 'Spike', 'Buddy', 'Marley', 'Meg', 'Hulk', 'Bali', 'Nick',
    'Quica', 'Ted', 'Maya', 'Bruce', 'Koda', 'Duque', 'Zeca', 'Shiva'
  ];

  const catNames = [
    'Mimi', 'Félix', 'Nala', 'Tom', 'Kika', 'Garfield', 'Lua', 
    'Mingau', 'Nina', 'Frajola', 'Mel', 'Romeu', 'Julieta', 'Gaia',
    'Toby', 'Ziggy', 'Sofia', 'Theo', 'Safira', 'Mozart', 'Mia',
    'Thor', 'Lola', 'Nino', 'Selina', 'Simba', 'Milu', 'Frida',
    'Salem', 'Pantera', 'Jade', 'Miau', 'Bilu', 'Floco', 'Fifi', 
    'Morgana', 'Muffin', 'Juno', 'Kitty', 'Boris', 'Chico', 'Neve',
    'Zara', 'Paçoca', 'Oliver', 'Pérola', 'Lilith', 'Pudim', 'Chiara'
  ];

  const dogImages = [
    'https://images.unsplash.com/photo-1543466835-00a7907e9de1',
    'https://images.unsplash.com/photo-1587300003388-59208cc962cb',
    'https://images.unsplash.com/photo-1552053831-71594a27632d',
    'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8',
    'https://images.unsplash.com/photo-1518717758536-85ae29035b6d',
    'https://images.unsplash.com/photo-1561037404-61cd46aa615b',
    'https://images.unsplash.com/photo-1546421845-6471bdcf3edf',
    'https://images.unsplash.com/photo-1583512603806-077998240c7a',
    'https://images.unsplash.com/photo-1615266508104-7a7b31777fef',
    'https://images.unsplash.com/photo-1583337130417-3346a1be7dee'
  ];

  const catImages = [
    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba',
    'https://images.unsplash.com/photo-1573865526739-10659fec78a5',
    'https://images.unsplash.com/photo-1495360010541-f48722b34f7d',
    'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
    'https://images.unsplash.com/photo-1548247416-ec66f4900b2e',
    'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13',
    'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec',
    'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8',
    'https://images.unsplash.com/photo-1577023311546-cdc07a8454d9',
    'https://images.unsplash.com/photo-1519052537078-e6302a4968d4'
  ];

  const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];
  const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const getBreedByType = (type) => {
    return type === 'dog' ? getRandomElement(dogBreeds) : getRandomElement(catBreeds);
  };

  const getImageByType = (type) => {
    const imageArray = type === 'dog' ? dogImages : catImages;
    return `${getRandomElement(imageArray)}?auto=format&fit=crop&w=800&q=80`;
  };

  // Criar um array com os nomes já utilizados para evitar duplicações
  // Começamos com os nomes dos pets específicos que já definimos
  const usedNames = ['Belinha', 'Bola', 'Floquinho', 'Lola'];

  // Função para obter um nome aleatório e único
  const getUniquePetName = (type) => {
    const namesArray = type === 'dog' ? dogNames : catNames;
    let name;

    do {
      name = getRandomElement(namesArray);
    } while (usedNames.includes(name));

    usedNames.push(name);
    return name;
  };

  // Pets específicos que devem estar nos resultados
  const specificPets = [
    {
      id: "1",
      name: "Belinha",
      type: "dog",
      breed: "Husky",
      age: 13,
      gender: "Fêmea",
      size: "médio",
      color: "Cinza e Branco",
      status: "disponível",
      location: "São Paulo - Centro",
      characteristics: ["Dócil", "Amoroso", "Calmo", "Inteligente"],
      image: "https://images.unsplash.com/photo-1583512603806-077998240c7a?auto=format&fit=crop&w=800&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1583512603806-077998240c7a?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Belinha é uma cachorra de 13 anos que é dócil, afetuosa e calma. Ela está procurando um lar amoroso. Ela é de porte médio e tem uma linda pelagem cinza e branco. Ela seria uma companheira perfeita para momentos tranquilos e passeios leves."
    },
    {
      id: "2",
      name: "Bola",
      type: "cat",
      breed: "Sphynx",
      age: 4,
      gender: "Macho",
      size: "pequeno",
      color: "Cinza",
      status: "pendente",
      location: "São Paulo - Zona Norte",
      characteristics: ["Brincalhão", "Curioso", "Energético", "Sociável"],
      image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1577023311546-cdc07a8454d9?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Bola é um gato de 4 anos que é brincalhão, curioso e energético. Ele está procurando um lar amoroso. Ele é de porte pequeno e tem uma linda pelagem cinza. Ele seria um companheiro perfeito para momentos de brincadeira e diversão."
    },
    {
      id: "3",
      name: "Floquinho",
      type: "cat",
      breed: "SRD (Sem Raça Definida)",
      age: 14,
      gender: "Macho",
      size: "médio",
      color: "Branco",
      status: "pendente",
      location: "Guarulhos, SP",
      characteristics: ["Calmo", "Afetuoso", "Independente", "Sociável"],
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Floquinho é um gato de 14 anos que é calmo, afetuoso e independente. Ele está procurando um lar amoroso. Ele é de porte médio e tem uma linda pelagem branca. Ele seria um companheiro perfeito para momentos tranquilos e companhia serena."
    },
    {
      id: "4",
      name: "Lola",
      type: "dog",
      breed: "Pastor Alemão",
      age: 8,
      gender: "Fêmea",
      size: "grande",
      color: "Preto e Marrom",
      status: "adotado",
      location: "Santo André, SP",
      characteristics: ["Protetor", "Leal", "Inteligente", "Energético"],
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80",
      galleryImages: [
        "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Lola é uma cachorra de 8 anos que é protetora, leal e inteligente. Ela foi adotada recentemente. Ela é de porte grande e tem uma linda pelagem preto e marrom. Ela é uma companheira perfeita para passeios e atividades ao ar livre."
    }
  ];

  const colorsByType = {
    dog: ['Marrom', 'Preto', 'Branco', 'Caramelo', 'Dourado', 'Cinza', 'Malhado', 'Preto e Branco', 'Tricolor'],
    cat: ['Laranja', 'Branco', 'Preto', 'Cinza', 'Caramelo', 'Tigrado', 'Preto e Branco', 'Rajado', 'Siamês']
  };

  const characteristicsByType = {
    dog: ['Amigável', 'Leal', 'Energético', 'Brincalhão', 'Protetor', 'Calmo', 'Afetuoso', 'Inteligente', 'Dócil', 'Curioso'],
    cat: ['Independente', 'Brincalhão', 'Curioso', 'Afetuoso', 'Quieto', 'Ativo', 'Carinhoso', 'Sociável', 'Tímido']
  };

  const getCharacteristics = (type) => {
    const traits = characteristicsByType[type];
    const numTraits = getRandomNumber(3, 5);
    const shuffled = [...traits].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numTraits);
  };

  // Generate additional pets to total 30
  const additionalPetsCount = 26; // 30 - 4 specific pets
  const generatedPets = Array.from({ length: additionalPetsCount }, (_, index) => {
    const type = getRandomElement(petTypes);
    const breed = getBreedByType(type);
    const age = getRandomNumber(0, 15);
    const status = getRandomElement(statuses);
    const size = getRandomElement(sizes);
    const gender = getRandomElement(genders);
    const location = getRandomElement(locations);

    // Agora usamos a função getUniquePetName para obter um nome único
    const name = getUniquePetName(type);

    const color = getRandomElement(colorsByType[type]);
    const characteristics = getCharacteristics(type);

    // Descrições em português
    const animalType = type === 'dog' ? 'cachorro' : 'gato';
    const ageText = age === 1 ? 'ano' : 'anos';
    const pronoun = gender === 'Macho' ? 'Ele' : 'Ela';
    const adjective = gender === 'Macho' ? 'um companheiro' : 'uma companheira';
    const activityText = type === 'dog' ? 
      'passeios e atividades ao ar livre' : 
      'momentos tranquilos e brincadeiras em casa';

    return {
      id: (index + 5).toString(), // Start from 5
      name, 
      type,
      breed,
      age,
      gender,
      size,
      color,
      status,
      location,
      characteristics,
      image: getImageByType(type),
      galleryImages: Array.from({ length: getRandomNumber(2, 5) }, () => getImageByType(type)),
      description: `${name} é ${animalType === 'cachorro' ? 'um' : 'um'} ${animalType} de ${age} ${ageText} que é ${characteristics.join(', ').toLowerCase()} e está procurando um lar amoroso. ${pronoun} é de porte ${size} e tem uma linda pelagem ${color.toLowerCase()}. ${pronoun} seria ${adjective} perfeito para ${activityText}.`
    };
  });

  // Combine specific pets with generated pets
  return [...specificPets, ...generatedPets];
};

// Create a mock data
const mockPets = createMockPets();

const api = {
  // Get all pets with optional filtering
  getPets: async (filters = {}) => {
    try {
      // Podemos usar a API do Petfinder no futuro com a chave: PgvZyqee4fsynSKr9989kKmusPxcpUPgmbtwPy1ze1CNF5wZmC
      // Por enquanto, usamos dados mock

      // Filtrar dados baseados nos filtros fornecidos
      let filteredPets = [...mockPets];

      if (filters.type && filters.type !== '') {
        filteredPets = filteredPets.filter(pet => pet.type === filters.type);
      }

      if (filters.ageMin !== undefined && filters.ageMax !== undefined) {
        filteredPets = filteredPets.filter(pet => pet.age >= filters.ageMin && pet.age <= filters.ageMax);
      }

      if (filters.sizes && filters.sizes.length > 0) {
        filteredPets = filteredPets.filter(pet => filters.sizes.includes(pet.size.toLowerCase()));
      }

      if (filters.location && filters.location !== '') {
        filteredPets = filteredPets.filter(pet => pet.location === filters.location);
      }

      if (filters.statuses && filters.statuses.length > 0) {
        filteredPets = filteredPets.filter(pet => filters.statuses.includes(pet.status));
      }

      // Simular um pequeno atraso de rede
      await new Promise(resolve => setTimeout(resolve, 800));

      return filteredPets;
    } catch (error) {
      console.error('Erro ao buscar pets:', error);
      throw error;
    }
  },

  // Get a pet by ID
  getPetById: async (id) => {
    try {
      // Encontrar o pet em nossos dados
      const pet = mockPets.find(pet => pet.id === id);

      if (!pet) {
        throw new Error('Pet não encontrado');
      }

      // Simular um pequeno atraso de rede
      await new Promise(resolve => setTimeout(resolve, 500));

      return pet;
    } catch (error) {
      console.error(`Erro ao buscar pet com id ${id}:`, error);
      throw error;
    }
  }
};

export default api;