import React from 'react';
import axios from 'axios';
import Movie from '../components/Movie';
import './Home.css';

class Home extends React.Component {
  // 동적 변수 할당
  state = {
    isLoading: true,
    movies: [],
  };

  // 영화 목록 가져오기 (최신 20개)
  getMovies = async () => {
    const {
      data : {
        data: {movies},
      },
    } = await axios.get('https://yts-proxy.now.sh/list_movies.json?sort_by=rating');
    
    this.setState({ movies, isLoading: false });
  }

  // Render 함수가 실행 된 후 실행
  componentDidMount() {
    // 영화 데이터 로딩
    this.getMovies();
  }

  // 렌더링 함수
  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {
          isLoading ? (
            <div className="loader">
              <span className="loader__text"> Loading... </span>
            </div>
          ) : (
            <div className="movies">
              {movies.map(movie => (
                <Movie 
                  key={movie.id}
                  id={movie.id}
                  year={movie.year}
                  title={movie.title}
                  summary={movie.summary}
                  poster={movie.medium_cover_image}
                  genres={movie.genres}
                />
          ))}
          </div>
        )}
      </section>
    );
  }
}

export default Home;
