import { createToast, isObjEmpty } from '../utils';

export function weightsValidation(toast, machineCapacity) {
  return this.test('test-weight', 'error', function (value) {
    return (
      value <= machineCapacity ||
      createToast(toast, {
        type: 'error',
        title: 'Αποτυχία',
        content: `Η χωρητικότητα του μηχανήματος ειναι μέχρι ${machineCapacity} κιλά`,
      })
    );
  });
}
export function formulaStandAlone(toast) {
  return this.test('test-standAlone', 'error', function (formula) {
    if (formula.length && !isObjEmpty(this.parent.baseElement)) return true;
    if (!formula.length && isObjEmpty(this.parent.baseElement)) return true;
    return createToast(toast, {
      type: 'error',
      title: 'Αποτυχία',
      content:
        'Τα πεδία "Στοιχεία" και "Βασικό Στοιχείο" πρέπει να είναι ή γεμάτα ή άδεια',
    });
  });
}
export function baseElementStandAlone(toast) {
  return this.test('test-standAlone', 'error', function (baseElement) {
    if (this.parent.formula.length && !isObjEmpty(baseElement)) return true;
    if (!this.parent.formula.length && isObjEmpty(baseElement)) return true;
    return createToast(toast, {
      type: 'error',
      title: 'Αποτυχία',
      content:
        'Τα πεδία "Στοιχεία" και "Βασικό Στοιχείο" πρέπει να είναι ή γεμάτα ή άδεια',
    });
  });
}
export function formulaValidation(toast) {
  return this.test('test-formula', 'error', function (formula) {
    if (!formula.length || formula.length >= 3) return true;
    return createToast(toast, {
      type: 'error',
      title: 'Αποτυχία',
      content: 'Το πεδίο "Στοιχεία" πρέπει να είναι της μορφής 0-0-0',
    });
  });
}

export function nullConverter(value, originalValue) {
  return String(originalValue).trim() === '' ? null : value;
}
