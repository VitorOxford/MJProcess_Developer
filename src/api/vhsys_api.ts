// src/api/vhsys_api.ts
import axios from 'axios';

// Instância base do Axios, sem chaves de acesso.
const vhsys = axios.create({
  baseURL: 'https://api.vhsys.com.br/v2',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptador para tratar e registrar erros de forma centralizada.
vhsys.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na API VHSYS:', {
      message: error.message,
      url: error.config.url,
      method: error.config.method,
      data: error.config.data,
      response: error.response?.data,
    });
    return Promise.reject(error.response?.data || 'Ocorreu um erro na comunicação com a vhsys.');
  }
);

/**
 * Função exportada para criar um novo pedido no VHSYS.
 * Esta função exige as chaves do usuário logado para realizar a operação de escrita.
 * @param orderPayload - O objeto contendo os dados do pedido.
 * @param accessToken - O access-token do usuário que está criando o pedido.
 * @param secretAccessToken - O secret-access-token do usuário.
 * @returns A promessa da requisição Axios.
 */
export const createVhsysOrder = (orderPayload: any, accessToken: string, secretAccessToken: string) => {
  return vhsys.post('/pedidos', orderPayload, {
    headers: {
      'access-token': accessToken,
      'secret-access-token': secretAccessToken
    }
  });
};

// Chaves de acesso com permissão apenas de LEITURA para buscar dados públicos.
const readAccessToken = 'ROMyaYUS0oIbyoHKDETsqIEFijKqEM';
const readSecretAccessToken = 'hvIAhtNngUDBAZv7GxKJsuSVa6rZZxW';

/**
 * Busca a lista completa de clientes, lidando com a paginação da API.
 * Usa chaves de acesso somente leitura.
 */
export const getClientes = async () => {
  try {
    let allClientes = [];
    let offset = 0;
    const limit = 250;
    let total = 0;

    do {
      const response = await vhsys.get(`/clientes?limit=${limit}&offset=${offset}`, {
        headers: { 'access-token': readAccessToken, 'secret-access-token': readSecretAccessToken }
      });
      const data = response.data.data;
      const paging = response.data.paging;

      if (data && data.length > 0) {
        allClientes.push(...data);
      }

      total = paging?.total_count || 0;
      offset += limit;

    } while (allClientes.length < total && total > 0);

    return allClientes;
  } catch (error) {
    console.error('Falha ao buscar clientes do vhsys:', error);
    return [];
  }
};

/**
 * Busca a lista completa de vendedores, lidando com a paginação da API.
 * Usa chaves de acesso somente leitura.
 */
export const getVendedores = async () => {
  try {
    let allVendedores = [];
    let offset = 0;
    const limit = 250;
    let total = 0;

    do {
      const response = await vhsys.get(`/vendedores?limit=${limit}&offset=${offset}`, {
        headers: { 'access-token': readAccessToken, 'secret-access-token': readSecretAccessToken }
      });
      const data = response.data.data;
      const paging = response.data.paging;

      if (data && data.length > 0) {
        allVendedores.push(...data);
      }

      total = paging?.total_count || 0;
      offset += limit;

    } while (allVendedores.length < total && total > 0);

    return allVendedores;
  } catch (error) {
    console.error('Falha ao buscar vendedores do vhsys:', error);
    return [];
  }
};

/**
 * Busca a lista completa de produtos, lidando com a paginação da API.
 * Usa chaves de acesso somente leitura.
 */
export const getProdutos = async () => {
  try {
    let allProdutos = [];
    let offset = 0;
    const limit = 250;
    let total = 0;

    do {
      const response = await vhsys.get(`/produtos?limit=${limit}&offset=${offset}`, {
        headers: { 'access-token': readAccessToken, 'secret-access-token': readSecretAccessToken }
      });
      const data = response.data.data;
      const paging = response.data.paging;

      if (data && data.length > 0) {
        allProdutos.push(...data);
      }

      // CORREÇÃO APLICADA AQUI: Verifica se 'paging' existe antes de usar
      total = paging?.total_count || 0;
      offset += limit;

    } while (allProdutos.length < total && total > 0);

    return allProdutos;
  } catch (error) {
    console.error('Falha ao buscar produtos do vhsys:', error);
    return [];
  }
};

export default vhsys;
