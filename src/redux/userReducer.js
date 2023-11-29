import {
  ADDRESS,
  BOOKING_LATER_DATE,
  BOOKING_STATUS,
  B_ID,
  CITY,
  CONTINUE_FALSE,
  CONTINUE_TRUE,
  COUNTRY,
  D_TOKEN,
  END,
  ID,
  LANGUAGEUPDATED_,
  LOGIN,
  NOTIICATION_VISIBLE,
  SIGNOUT,
  START,
  START_TRUE,
  TRIP_DATA,
  USERDATA,
} from './ActionTypes';

const initialState = {
  countryId: '',
  cityId: '',
  userId: '',
  userData: {},
  booking_id: '',
  booking_Later_Date: '',
  booking_status: '',
  login: false,
  visible_: false,
  LangigaeUpdated: false,
  startTrip: false,
  tripData: {},
  continue_trip: false,
  start_trip: false,
  address_: '',
  divice_token: '',
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case ID:
      return {...state, userId: action.payload};
    case B_ID:
      return {...state, booking_id: action.payload};
    case BOOKING_STATUS:
      return {...state, booking_status: action.payload};
    case BOOKING_LATER_DATE:
      return {...state, booking_Later_Date: action.payload};
    case USERDATA:
      return {...state, userData: action.payload};
    case BOOKING_STATUS:
      return {...state, booking_status: action.payload};
    case COUNTRY:
      return {...state, countryId: action.payload};
    case CITY:
      return {...state, cityId: action.payload};
    case LANGUAGEUPDATED_:
      return {...state, LangigaeUpdated: action.payload};
    case NOTIICATION_VISIBLE:
      return {...state, visible_: action.payload};
    case LOGIN:
      return {...state, login: true};
    case START:
      return {...state, startTrip: true};
    case TRIP_DATA:
      return {...state, tripData: action.payload};
    case END:
      return {...state, startTrip: false};
    case CONTINUE_TRUE:
      return {...state, continue_trip: true};
    case START_TRUE:
      return {...state, start_trip: true};
    case CONTINUE_FALSE:
      return {...state, continue_trip: false};
    case ADDRESS:
      return {...state, address_: action.payload};
    case D_TOKEN:
      return {...state, divice_token: action.payload};
    case SIGNOUT:
      return {initialState};

    default:
      return state;
  }
}
