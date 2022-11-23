export default class Email {
  private _valor: string;
  private static readonly regx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(valor: string) {
    if (!Email.regx.test(valor)) {
      throw new Error('Email inválido');
    }
    this._valor = valor;
  }

  get valor(): string {
    return this._valor;
  }
}
