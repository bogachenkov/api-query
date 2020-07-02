import { v4 as uuidv4 } from 'uuid';
import ActionTypes from '@actionTypes';

export interface IHistoryRecord {
  id?: string;
  name: string;
  value?: string;
}

interface IHistoryState {
  records: IHistoryRecord[],
  selected: string
}

interface IHistoryAction {
  type: string;
  payload: IHistoryRecord;
}

export const initialRecordValue =
`/*
  # Основная информация:
  # Поле запроса (слева) принимает только валидный JSON и JS-комментарии;
  # Названия вкладок формируются по значению ключа "queryType",
  если ключ не указан, то названию будет присвоено "Untitled" + текущее время.;
  # Вместо реального API стоят заглушки;
  # Каждый новый (изменённый) запрос сохраняется в историю;
  # Текущий максимальный размер истории - 20 записей;
  # При выполнении запроса из истории (не изменяя его), данный запрос перемещается в начало истории;
  # Ширина редактора и история запросов сохраняются в локальном хранилище до следующего выхода пользователя из аккаунта;
  # Кнопка "Форматировать" форматирует поле запроса (также же работает комбинация клавиш Shift+Alt+F);
  # Перед отправкой запроса, выполняется простая валидация на правильность JSON'a
*/

{
  "queryType": "test.query.demo",
  "isDemoVersion": true,
  "someOtherField": 1000
}`;

function generateEmptyTab() {
  const id = uuidv4();
  const emptyRecord: IHistoryRecord = {
    id,
    name: 'Untitled',
    value: initialRecordValue
  }
  return {
    records: [
      emptyRecord
    ],
    selected: id
  }
}

function push(records: IHistoryRecord[], newRecord: IHistoryRecord, maxHistoryLength = 20) {
  if (records.length >= maxHistoryLength) {
    return [...records.slice(1), newRecord];
  } else {
    return [...records, newRecord];
  };
};

function update(records: IHistoryRecord[], record: IHistoryRecord) {
  const updatedRecords = records.map(rec => {
    if (rec.id === record.id) return {
      ...rec,
      value: record.value,
      name: record.name
    };
    return rec;
  });
  return updatedRecords.sort((x, y) => x.id === record.id ? 1 : y.id === record.id ? -1 : 0);
}

function remove(records: IHistoryRecord[], rec_id: string) {
  
  const filteredRecords = [...records.filter(rec => rec.id !== rec_id)];
  return {
    records: filteredRecords
  }
}

function removeAndReselect(records: IHistoryRecord[], rec_id: string) {
  let newSelected: string;

  const recIndex = records.findIndex(rec => rec.id === rec_id);
  if (records[recIndex + 1]) newSelected = records[recIndex + 1].id;
  else newSelected = records[recIndex - 1].id;

  const filteredRecords = [...records.filter(rec => rec.id !== rec_id)];

  return {
    selected: newSelected,
    records: filteredRecords
  }
}

////////////////
const initialState:IHistoryState = generateEmptyTab();

export default function(state = initialState, { type, payload }: IHistoryAction): IHistoryState {
  switch (type) {
    case ActionTypes.NEW_RECORD:
      const id = uuidv4();
      return {
        ...state,
        records: push(state.records, {
          id,
          value: payload.value,
          name: payload.name
        }),
        selected: id
      };
    case ActionTypes.UPDATE_RECORD:
      return {
        ...state,
        records: update(state.records, payload)
      };
    case ActionTypes.REMOVE_RECORD:
      return {
        ...state,
        ...remove(state.records, payload.id)
      }
    case ActionTypes.REMOVE_SELECTED_RECORD:
      if (state.records.length === 1) {
        return {
          ...state,
          ...generateEmptyTab()
        }
      } else {
        return {
          ...state,
          ...removeAndReselect(state.records, payload.id)
        }
      }
    case ActionTypes.SELECT_RECORD:
      return {
        ...state,
        selected: payload.id
      }
    case ActionTypes.CLEAR_HISTORY:
      return {
        ...state,
        ...generateEmptyTab()
      }
    case ActionTypes.SIGN_OUT:
      return initialState;
    default:
      return state;
  }
}