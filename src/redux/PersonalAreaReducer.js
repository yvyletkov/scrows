import {api} from "../api/api";

let initialState = {
  last_name: null,
  name: null,
  middle_name: null,
  date_of_birth: null,
  gender: null,
  avatar: null,
  entity_type: null,
  email: null,
  phone: null,
  isFetching: false,
  document_type: null,
  passport_data_created: null,
  passport_data_number: null,
  passport_data_code: null,
  judical_type: null,
  entity_id: null,
  entity_tin: null,
  entity_name:null,
  entity_bank_account_data: null,
  payment_data: [],
  alertSuccessShow:false,
  alertErrorShow:false,
  urlRedirect:'',
  showCodePhoneForm:false,
  verification_id: null,
};

const personalAreaReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return {
        ...state,
        ...action.payload,
      };
    case "SET_SECURE_DATA":
      return {
        ...state,
        ...action.payload,
      };
    case "TOGGLE-IS-FETCHING": {
      return { ...state, isFetching: action.status };
    }
    case "SET_INDIVIDUAL_DATA": {
      return {
        ...state,
        ...action.payload,
      };
    }
    case "SET_ENTITY_DATA": {
      return {
        ...state,
        ...action.payload,
      };
    }
    case "SET_PAYMENT_DATA": {
      return {
        ...state,
        payment_data : action.payload,
      };
    }
    case "SHOW_SUCCESS_ALERT": {
      return { ...state, alertSuccessShow: action.status };
    }
    case "SHOW_ERROR_ALERT": {
      return { ...state, alertErrorShow: action.status };
    }
    case "HIDE_SUCCESS_ALERT": {
      return { ...state, alertSuccessShow: action.status };
    }
    case "HIDE_ERROR_ALERT": {
      return { ...state, alertErrorShow: action.status };
    }
    case "SET_URL_REDIRECT": {
      return { ...state, urlRedirect: action.payload.redirect_url };
    }
    case "SET_VERIFICATION_ID": {
      return { ...state, ...action.payload };
    }
    case "SHOW_CODE_PHONE": {
      return { ...state, showCodePhoneForm: action.status };
    }
    case "SET_USER_PHONE": {
      return { ...state, phone: action.payload };
    }

    default:
      return state;
  }
};

export const getUserData = () => (dispatch) => {
  dispatch(toggleIsFetching(true));
  api
    .getUserData()
    .then((response) => {
      console.log('getUserData res:', response)
      dispatch(setUserData(response));
      dispatch(toggleIsFetching(false));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const changeUserData = (
  middle_name,
  last_name,
  name,
  date_of_birth,
  entity_type,
  gender
) => (dispatch) => {
  api
    .changeUserData(
      middle_name,
      last_name,
      name,
      date_of_birth,
      entity_type,
      gender
    )
    .then((response) => {
      dispatch(setUserData(response));
      dispatch(showSuccessAlert(true));
      setTimeout(() => {
        dispatch(showSuccessAlert(false))
      }, 2000)
    })
    .catch((err) => {
      dispatch(showErrorAlert(true));
      console.log(err);
    });
};

export const getIndividualData = () => (dispatch) => {
  dispatch(toggleIsFetching(true));
  api
      .getIndividualData()
      .then((response) => {
        dispatch(setIndividualData(response));
        dispatch(toggleIsFetching(false));
      })
      .catch((err) => {
        console.log(err);
      });
};

export const changeIndividualData = (
    document_type,
    passport_data_number,
    passport_data_created,
    passport_data_code) => (dispatch) => {
  api.changeIndividualData(
          document_type,
          passport_data_number,
          passport_data_created,
          passport_data_code,
      )
      .then((response) => {
        dispatch(setIndividualData(response));
        dispatch(showSuccessAlert(true));
      })
      .catch((err) => {
        dispatch(showErrorAlert(true));
        console.log(err);
      });
};

export const getEntityData = () => (dispatch) => {
  dispatch(toggleIsFetching(true));
  api
      .getEntityData()
      .then((response) => {
        dispatch(setEntityData(response));
        dispatch(toggleIsFetching(false));
      })
      .catch((err) => {
        console.log(err);
      });
};

export  const addUserCard = () => (dispatch) => {
  api.addUserCard()
      .then((response) => {
        dispatch(showSuccessAlert(true));
        dispatch(setUrlRedirect(response));
        console.log(response)
      })
      .catch((err) => {
        dispatch(showErrorAlert(true));
        console.log(err)
      })
}

export const changeEntityData =
    (judical_type, entity_id, entity_tin, entity_bank_account_data,entity_name) => (dispatch) => {
  api
      .changeEntityData(
          judical_type,
          entity_id,
          entity_tin,
          entity_bank_account_data,
          entity_name
      )
      .then((response) => {
        dispatch(setUserData(response));
        dispatch(showSuccessAlert(true));
      })
      .catch((err) => {
        console.log(err);
        dispatch(showErrorAlert(true));
      });
};

export const getPaymentData = () => (dispatch) => {
  dispatch(toggleIsFetching(true));
  api
      .getPaymentData()
      .then((response) => {
        dispatch(setPaymentData(response));
        dispatch(toggleIsFetching(false));
      })
      .catch((err) => {
      console.log(err);
    });
};

export const takeCodeForPhone = (phone) => (dispatch) => {
  dispatch(toggleIsFetching(true));
  api.takeCodeForPhone(phone)
      .then((response) => {
        dispatch(setVerificationId(response));
        dispatch(showCodePhoneForm(true))
        dispatch(toggleIsFetching(false));
      })
      .catch((err) => {
        console.log(err);
      });
};

export const sendPhoneCode = (id, code) => (dispatch) => {
  // dispatch(toggleIsFetching(true));
  api.sendCodeForPhone(id, code)
      .then((response) => {
        console.log(response)
        // dispatch(setUserPhone(response));
        // dispatch(toggleIsFetching(false));
      })
      .catch((err) => {
        console.log(err);
      });
};

export const postUserFiles = (files) => (dispatch) => {
  // dispatch(toggleIsFetching(true));
  api.postUserFiles(files)
      .then((response) => {
        console.log(response)
        // dispatch(setVerificationId(response));
        // dispatch(showCodePhoneForm(true))
        // dispatch(toggleIsFetching(false));
      })
      .catch((err) => {
        console.log(err);
      });
};

export const setUserData = (data) => ({ type: "SET_USER_DATA", payload: data });
export const setSecureData = (data) => ({
  type: "SET_SECURE_DATA",
  payload: data,
});
export const toggleIsFetching = (status) => ({
  type: "TOGGLE-IS-FETCHING",
  status: status,
});
export const setIndividualData = (data) => ({
  type: "SET_INDIVIDUAL_DATA",
  payload: data,
});

export const setUrlRedirect = (data) => ({
  type: "SET_URL_REDIRECT",
  payload: data,
});

export const setEntityData = (data) => ({
  type: "SET_ENTITY_DATA",
  payload: data,
});
export const setPaymentData = (data) => ({
  type: "SET_PAYMENT_DATA",
  payload: data,
});

export const showSuccessAlert = (status) => ({
  type: "SHOW_SUCCESS_ALERT",
  status: status,
});

export const showErrorAlert = (status) => ({
  type: "SHOW_ERROR_ALERT",
  status: status,
});

export const hideSuccessAlert = (status) => ({
  type:"HIDE_SUCCESS_ALERT",
  status: status,
})

export const hideErrorAlert = (status) => ({
  type:"HIDE_ERROR_ALERT",
  status: status,
})

export const showCodePhoneForm = (status) => ({
  type:"SHOW_CODE_PHONE",
  status: status,
})

export const setVerificationId = (data) => ({
  type: "SET_VERIFICATION_ID",
  payload: data
});

export const setUserPhone = (data) => ({
  type: "SET_USER_PHONE",
  payload: data
});

export default personalAreaReducer;
