const ActionTypes = {
   SET_ERROR: "SET_ERROR",
   REMOVE_ERROR: "REMOVE_ERROR",

   CHECK_SESSION: "CHECK_SESSION",
   CHECK_SESSION_SUCCESS: "CHECK_SESSION_SUCCESS",
   CHECK_SESSION_FAILS: "CHECK_SESSION_FAILS",

   SIGN_IN_REQUEST: "SIGN_IN_REQUEST",
   SIGN_IN_SUCCESS: "SIGN_IN_SUCCESS",
   SIGN_IN_FAILS: "SIGN_IN_FAILS",
   SIGN_OUT: "SIGN_OUT",
  
   EDITOR_RESIZE: "EDITOR_RESIZE",
   SET_WIDTH: "SET_WIDTH",

   SET_RESPONSE_VALUE: "SET_RESPONSE_VALUE",
   REMOVE_RESPONSE_VALUE: "REMOVE_RESPONSE_VALUE",

   NEW_RECORD: "NEW_RECORD",
   UPDATE_RECORD: "UPDATE_RECORD",
   REMOVE_RECORD_REQUEST: "REMOVE_RECORD_REQUEST",
   REMOVE_RECORD: "REMOVE_RECORD",
   REMOVE_SELECTED_RECORD: "REMOVE_SELECTED_RECORD",
   SELECT_RECORD: "SELECT_RECORD",
   RUN_FROM_HISTORY: "RUN_FROM_HISTORY",
   CLEAR_HISTORY: "CLEAR_HISTORY",

   QUERY_REQUEST: "QUERY_REQUEST"
};

export default ActionTypes;