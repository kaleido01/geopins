export default function reducer(state, { type, payload }) {
	switch (type) {
		case "LOGIN_USER":
			return {
				...state,
				currentUser: payload
			};
		case "IS_LOGGED_IN":
			return {
				...state,
				isAuth: payload
			};
		case "SIGNOUT_USER":
			return {
				...state,
				isAuth: false,
				currentUser: null
			};
		case "CREATE_DRAFT":
			return {
				...state,
				currentPin: null,
				draft: {
					latitude: 0,
					longitude: 0
				}
			};
		case "DELETE_DRAFT":
			return {
				...state,
				draft: null
			};
		case "UPDATE_DRAFT_LOCATION":
			return {
				...state,
				draft: payload
			};
		case "GET_PINS":
			return { ...state, pins: payload };
		case "CREATE_PIN":
			const newPin = payload;
			const prevPins = state.pins.filter(pin => pin._id !== newPin._id);
			return {
				...state,
				pins: [...prevPins, newPin]
			};
		case "SET_PIN":
			return {
				...state,
				currentPin: payload,
				draft: null
			};
		case "DELETE_PIN":
			//まず削除される予定のピン情報が格納される
			const deletedPin = payload;
			//次にfilterを用いてPins配列全てのIdと削除される予定のIdを比較して値がちがければfilterdPinsという新しい変数内に格納される
			const filterdPins = state.pins.filter(pin => pin._id !== deletedPin._id);
			//最後に削除されるピンが取り除かれた新しい状態を格納する
			return {
				...state,
				pins: filterdPins,
				currentPin: null
			};
		default:
			return state;
	}
}
