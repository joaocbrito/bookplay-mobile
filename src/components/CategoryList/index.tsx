import React, { useState, useEffect } from 'react';
import api from '../../services/api'; // api para ser consumida, foi usado axios

import {
  List,
  CategoryContainer,
  CategoryImage,
  CategoryName,
  CategoryStatus,
  RedCircle,
  Info,
} from './styles';

interface Livro {
  livro: { CodLivro: number; CodConteudo: number; Nome: string };
}

const CategoryList: React.FC = () => {
  const [livros, setLivros] = useState<Livro[]>([]); // estado onde será armazenado os objetos da API
  const [isLoading, setIsLoading] = useState(true); // estado para armazenar o carregamento da página
  const [fail, setFail] = useState(false); // estado para informar quando a APi retornar erro 500

  useEffect(() => {
    async function loadAPI(): Promise<void> {
      setIsLoading(true);

      // este try serve para "pegar" o erro 500, quando a requisição falhar
      // notei depois que a própria requisiçao informa o erro, porém como de costume, utilizei o try - catch
      try {
        // consome a API
        const response = await api.get('/');

        setLivros(response.data.data);

        setFail(false);
      } catch (err) {
        setFail(true);
      }
      setIsLoading(false);
    }
    loadAPI();
  }, []);

  const CategoryItem: React.FC<Livro> = ({ livro }) => (
    <CategoryContainer>
      <CategoryImage
        source={{
          uri: `https://bookplay.com.br/images/livros/${
            livro.CodLivro < 10000 ? '0' : ''
          }${livro.CodLivro}/Imagem.jpg`,
        }}
      />
      <CategoryName numberOfLines={1}>{livro.Nome}</CategoryName>
      <CategoryStatus>
        <RedCircle />
        <Info>51.9K</Info>
      </CategoryStatus>
    </CategoryContainer>
  );

  return (
    <List>
      {livros.map((livro) => (
        <CategoryItem key={livro} livro={livro} />
      ))}
    </List>
  );
};

export default CategoryList;
