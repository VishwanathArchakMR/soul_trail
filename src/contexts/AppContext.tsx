import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { mockData, Place, Region, User } from '../data/mockData';

interface AppState {
  user: User | null;
  currentRegion: string[];
  places: Place[];
  regions: Region[];
  searchQuery: string;
  filters: {
    category?: string;
    emotion?: string;
    rating?: number;
  };
  wishlist: string[];
  userPreferences: Record<string, number>;
}

type AppAction = 
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_CURRENT_REGION'; payload: string[] }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_FILTERS'; payload: any }
  | { type: 'ADD_TO_WISHLIST'; payload: string }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
  | { type: 'UPDATE_PREFERENCES'; payload: { category: string; weight: number } }
  | { type: 'RATE_PLACE'; payload: { placeId: string; rating: number } }
  | { type: 'ADD_COMMENT'; payload: { placeId: string; comment: any } };

const initialState: AppState = {
  user: null,
  currentRegion: ['India', 'Karnataka'],
  places: mockData.places,
  regions: mockData.regions,
  searchQuery: '',
  filters: {},
  wishlist: [],
  userPreferences: {
    'Temples': 1,
    'Peaceful': 1,
    'Adventure': 1,
    'Heritage': 1,
    'Nature': 1
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: initialState,
  dispatch: () => null
});

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_CURRENT_REGION':
      return { ...state, currentRegion: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'ADD_TO_WISHLIST':
      return { 
        ...state, 
        wishlist: [...state.wishlist, action.payload] 
      };
    case 'REMOVE_FROM_WISHLIST':
      return { 
        ...state, 
        wishlist: state.wishlist.filter(id => id !== action.payload) 
      };
    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        userPreferences: {
          ...state.userPreferences,
          [action.payload.category]: state.userPreferences[action.payload.category] + action.payload.weight
        }
      };
    case 'RATE_PLACE':
      return {
        ...state,
        places: state.places.map(place => 
          place.id === action.payload.placeId 
            ? { ...place, rating: action.payload.rating }
            : place
        )
      };
    case 'ADD_COMMENT':
      return {
        ...state,
        places: state.places.map(place => 
          place.id === action.payload.placeId 
            ? { ...place, comments: [...(place.comments || []), action.payload.comment] }
            : place
        )
      };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};