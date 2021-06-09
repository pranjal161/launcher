/* eslint-disable filenames/match-exported */

// import axios from 'axios';

const mockedAxios: any = jest.genMockFromModule('axios')

// const mockAxios = axios as jest.Mocked<typeof axios>;
// this is the key to fix the axios.create() undefined error!
mockedAxios.create = jest.fn(() => mockedAxios)

export default mockedAxios;