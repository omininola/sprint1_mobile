export type Moto = {
  id_moto?: number;
  placa: string;
  modelo: string;
  filial?: Filial;
};

export type Filial = {
  id_filial?: number;
  nome: string;
  endereco: string;
};
