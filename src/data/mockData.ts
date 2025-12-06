export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'partner' | 'admin';
  avatar?: string;
}

export interface Place {
  id: string;
  name: string;
  category: 'Temples' | 'Peaceful' | 'Adventure' | 'Heritage' | 'Nature';
  emotionalTag: 'Spiritual' | 'Adventure' | 'Peaceful' | 'Cultural' | 'Scenic';
  description: string;
  history: string;
  coordinates: { lat: number; lng: number };
  coverImage: string;
  gallery: string[];
  timings?: string;
  contact?: string;
  location: {
    state: string;
    district: string;
    taluk: string;
    village: string;
  };
  rating: number;
  totalRatings: number;
  likes: number;
  comments?: Comment[];
  nearbyStays?: Stay[];
}

export interface Stay {
  id: string;
  name: string;
  address: string;
  price: number;
  rating: number;
  photos: string[];
  contact?: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: Date;
  rating?: number;
}

export interface Region {
  id: string;
  name: string;
  type: 'country' | 'state' | 'district' | 'taluk' | 'village';
  parent?: string;
  children: string[];
}

// ADMIN EDITABLE SECTION - SAMPLE DATA
export const mockData = {
  regions: [
    { id: 'india', name: 'India', type: 'country' as const, children: ['karnataka'] },
    { id: 'karnataka', name: 'Karnataka', type: 'state' as const, parent: 'india', children: ['udupi', 'chikmagalur', 'mysore'] },
    
    // Districts
    { id: 'udupi', name: 'Udupi', type: 'district' as const, parent: 'karnataka', children: ['udupi-taluk', 'karkala'] },
    { id: 'chikmagalur', name: 'Chikmagalur', type: 'district' as const, parent: 'karnataka', children: ['chikmagalur-taluk', 'mudigere'] },
    { id: 'mysore', name: 'Mysore', type: 'district' as const, parent: 'karnataka', children: ['mysore-taluk', 'nanjangud'] },
    
    // Taluks
    { id: 'udupi-taluk', name: 'Udupi Taluk', type: 'taluk' as const, parent: 'udupi', children: ['malpe', 'kaup'] },
    { id: 'karkala', name: 'Karkala', type: 'taluk' as const, parent: 'udupi', children: ['hebri', 'ajekar'] },
    { id: 'chikmagalur-taluk', name: 'Chikmagalur Taluk', type: 'taluk' as const, parent: 'chikmagalur', children: ['kemmanagundi', 'balehonnur'] },
    { id: 'mudigere', name: 'Mudigere', type: 'taluk' as const, parent: 'chikmagalur', children: ['kudremukh', 'kalasa'] },
    { id: 'mysore-taluk', name: 'Mysore Taluk', type: 'taluk' as const, parent: 'mysore', children: ['mysore-city', 'srirangapatna'] },
    { id: 'nanjangud', name: 'Nanjangud', type: 'taluk' as const, parent: 'mysore', children: ['nanjangud-town', 'gundlupet'] },
    
    // Villages
    { id: 'malpe', name: 'Malpe', type: 'village' as const, parent: 'udupi-taluk', children: [] },
    { id: 'kaup', name: 'Kaup', type: 'village' as const, parent: 'udupi-taluk', children: [] },
    { id: 'hebri', name: 'Hebri', type: 'village' as const, parent: 'karkala', children: [] },
    { id: 'ajekar', name: 'Ajekar', type: 'village' as const, parent: 'karkala', children: [] },
    { id: 'kemmanagundi', name: 'Kemmanagundi', type: 'village' as const, parent: 'chikmagalur-taluk', children: [] },
    { id: 'balehonnur', name: 'Balehonnur', type: 'village' as const, parent: 'chikmagalur-taluk', children: [] },
    { id: 'kudremukh', name: 'Kudremukh', type: 'village' as const, parent: 'mudigere', children: [] },
    { id: 'kalasa', name: 'Kalasa', type: 'village' as const, parent: 'mudigere', children: [] },
    { id: 'mysore-city', name: 'Mysore City', type: 'village' as const, parent: 'mysore-taluk', children: [] },
    { id: 'srirangapatna', name: 'Srirangapatna', type: 'village' as const, parent: 'mysore-taluk', children: [] },
    { id: 'nanjangud-town', name: 'Nanjangud Town', type: 'village' as const, parent: 'nanjangud', children: [] },
    { id: 'gundlupet', name: 'Gundlupet', type: 'village' as const, parent: 'nanjangud', children: [] }
  ],
  
  places: [
    // Udupi District Places
    {
      id: '1',
      name: 'Sri Krishna Temple',
      category: 'Temples' as const,
      emotionalTag: 'Spiritual' as const,
      description: 'Ancient temple dedicated to Lord Krishna, famous for its unique worship practice where the deity is worshipped through a silver-plated window with nine holes called Navagraha Kitiki.',
      history: 'Founded in the 13th century by Saint Madhvacharya, this temple is the center of Dvaita philosophy and attracts thousands of devotees daily.',
      coordinates: { lat: 13.3409, lng: 74.7421 },
      coverImage: 'https://images.pexels.com/photos/2780762/pexels-photo-2780762.jpeg',
      gallery: [
        'https://images.pexels.com/photos/2780762/pexels-photo-2780762.jpeg',
        'https://images.pexels.com/photos/4666748/pexels-photo-4666748.jpeg'
      ],
      timings: '5:30 AM - 1:00 PM, 3:00 PM - 9:00 PM',
      contact: '+91 8252 253 001',
      location: { state: 'Karnataka', district: 'Udupi', taluk: 'Udupi Taluk', village: 'Malpe' },
      rating: 4.8,
      totalRatings: 1250,
      likes: 890,
      nearbyStays: [
        {
          id: 's1',
          name: 'Temple View Heritage Hotel',
          address: 'Temple Street, Udupi',
          price: 2500,
          rating: 4.5,
          photos: ['https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg'],
          contact: '+91 8252 234 567'
        }
      ]
    },
    {
      id: '2',
      name: 'Malpe Beach',
      category: 'Peaceful' as const,
      emotionalTag: 'Peaceful' as const,
      description: 'Pristine beach with golden sands and crystal clear waters, perfect for watching mesmerizing sunsets and enjoying peaceful moments.',
      history: 'Malpe has been a major port town since ancient times, serving as a gateway for maritime trade and cultural exchange.',
      coordinates: { lat: 13.3508, lng: 74.7052 },
      coverImage: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg',
      gallery: [
        'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg',
        'https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg'
      ],
      timings: 'Open 24 hours',
      location: { state: 'Karnataka', district: 'Udupi', taluk: 'Udupi Taluk', village: 'Malpe' },
      rating: 4.6,
      totalRatings: 890,
      likes: 1200,
      nearbyStays: [
        {
          id: 's2',
          name: 'Beach Paradise Resort',
          address: 'Malpe Beach Road',
          price: 3500,
          rating: 4.3,
          photos: ['https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg'],
          contact: '+91 9876 543 210'
        }
      ]
    },
    {
      id: '3',
      name: 'St. Marys Island',
      category: 'Adventure' as const,
      emotionalTag: 'Adventure' as const,
      description: 'Unique hexagonal basaltic rock formations created by volcanic activity, accessible by boat from Malpe Beach.',
      history: 'Discovered by Vasco da Gama in 1498, these islands feature rare geological formations that are millions of years old.',
      coordinates: { lat: 13.3625, lng: 74.6917 },
      coverImage: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg',
      gallery: [
        'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg',
        'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg'
      ],
      timings: '9:00 AM - 5:00 PM (depends on boat availability)',
      location: { state: 'Karnataka', district: 'Udupi', taluk: 'Udupi Taluk', village: 'Malpe' },
      rating: 4.7,
      totalRatings: 670,
      likes: 840,
      nearbyStays: []
    },

    // Chikmagalur District Places
    {
      id: '4',
      name: 'Mullayanagiri Peak',
      category: 'Adventure' as const,
      emotionalTag: 'Adventure' as const,
      description: 'Highest peak in Karnataka offering breathtaking sunrise views, trekking trails, and serene mountain experiences.',
      history: 'Named after Mulappa Swamy, a sage who meditated here, this peak has been a spiritual destination for centuries.',
      coordinates: { lat: 13.3931, lng: 75.7249 },
      coverImage: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
      gallery: [
        'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
        'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg'
      ],
      timings: '6:00 AM - 6:00 PM',
      location: { state: 'Karnataka', district: 'Chikmagalur', taluk: 'Chikmagalur Taluk', village: 'Kemmanagundi' },
      rating: 4.9,
      totalRatings: 980,
      likes: 1450,
      nearbyStays: [
        {
          id: 's3',
          name: 'Mountain View Homestay',
          address: 'Kemmanagundi Hills',
          price: 2000,
          rating: 4.6,
          photos: ['https://images.pexels.com/photos/323775/pexels-photo-323775.jpeg'],
          contact: '+91 8234 567 890'
        }
      ]
    },
    {
      id: '5',
      name: 'Coffee Plantations',
      category: 'Nature' as const,
      emotionalTag: 'Peaceful' as const,
      description: 'Lush green coffee estates with guided tours, aromatic coffee experiences, and tranquil natural surroundings.',
      history: 'Coffee cultivation began here in the 17th century, making Chikmagalur the birthplace of coffee in India.',
      coordinates: { lat: 13.3161, lng: 75.7720 },
      coverImage: 'https://images.pexels.com/photos/442406/pexels-photo-442406.jpeg',
      gallery: [
        'https://images.pexels.com/photos/442406/pexels-photo-442406.jpeg',
        'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg'
      ],
      timings: '8:00 AM - 5:00 PM',
      location: { state: 'Karnataka', district: 'Chikmagalur', taluk: 'Chikmagalur Taluk', village: 'Balehonnur' },
      rating: 4.5,
      totalRatings: 560,
      likes: 780,
      nearbyStays: [
        {
          id: 's4',
          name: 'Coffee Estate Resort',
          address: 'Balehonnur Coffee Plantation',
          price: 4000,
          rating: 4.8,
          photos: ['https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg'],
          contact: '+91 9845 123 456'
        }
      ]
    },

    // Mysore District Places
    {
      id: '6',
      name: 'Mysore Palace',
      category: 'Heritage' as const,
      emotionalTag: 'Cultural' as const,
      description: 'Magnificent royal palace with Indo-Saracenic architecture, rich history, and stunning illumination during festivals.',
      history: 'Former residence of the Wodeyar dynasty, rebuilt in 1912 after a fire, showcasing royal grandeur and cultural heritage.',
      coordinates: { lat: 12.3052, lng: 76.6551 },
      coverImage: 'https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg',
      gallery: [
        'https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg',
        'https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg'
      ],
      timings: '10:00 AM - 5:30 PM',
      contact: '+91 821 242 3693',
      location: { state: 'Karnataka', district: 'Mysore', taluk: 'Mysore Taluk', village: 'Mysore City' },
      rating: 4.7,
      totalRatings: 2340,
      likes: 1890,
      nearbyStays: [
        {
          id: 's5',
          name: 'Royal Heritage Hotel',
          address: 'Near Mysore Palace',
          price: 5500,
          rating: 4.4,
          photos: ['https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg'],
          contact: '+91 821 234 5678'
        }
      ]
    },
    {
      id: '7',
      name: 'Chamundeshwari Temple',
      category: 'Temples' as const,
      emotionalTag: 'Spiritual' as const,
      description: 'Ancient temple atop Chamundi Hills dedicated to Goddess Chamundeshwari, offering panoramic views of Mysore city.',
      history: 'Dating back to the 12th century, this temple has been the patron deity of the Mysore royal family for generations.',
      coordinates: { lat: 12.2719, lng: 76.6421 },
      coverImage: 'https://images.pexels.com/photos/2870167/pexels-photo-2870167.jpeg',
      gallery: [
        'https://images.pexels.com/photos/2870167/pexels-photo-2870167.jpeg',
        'https://images.pexels.com/photos/3585047/pexels-photo-3585047.jpeg'
      ],
      timings: '5:00 AM - 2:00 PM, 3:30 PM - 9:00 PM',
      contact: '+91 821 248 0316',
      location: { state: 'Karnataka', district: 'Mysore', taluk: 'Mysore Taluk', village: 'Mysore City' },
      rating: 4.6,
      totalRatings: 1560,
      likes: 1234,
      nearbyStays: []
    },
    {
      id: '8',
      name: 'Brindavan Gardens',
      category: 'Nature' as const,
      emotionalTag: 'Peaceful' as const,
      description: 'Beautifully landscaped gardens with musical fountains, boat rides, and illuminated water displays in the evening.',
      history: 'Built in 1927 below the Krishnarajasagara Dam, designed by Sir Mirza Ismail in the Mughal style.',
      coordinates: { lat: 12.4244, lng: 76.5750 },
      coverImage: 'https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg',
      gallery: [
        'https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg',
        'https://images.pexels.com/photos/1153976/pexels-photo-1153976.jpeg'
      ],
      timings: '6:30 AM - 8:00 PM',
      location: { state: 'Karnataka', district: 'Mysore', taluk: 'Nanjangud', village: 'Nanjangud Town' },
      rating: 4.4,
      totalRatings: 890,
      likes: 967,
      nearbyStays: [
        {
          id: 's6',
          name: 'Garden View Resort',
          address: 'Near Brindavan Gardens',
          price: 3200,
          rating: 4.2,
          photos: ['https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg'],
          contact: '+91 823 456 7890'
        }
      ]
    }
  ]
};