import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capitalize(word) {
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
  }
  constructor(props) {
    super(props);
    console.log("hello i am constructor from News component");
    this.state = {
      articles: [],
      isLoaded: false,
      page: 1,
      totalResults: 0,
    };

    document.title = `${this.capitalize(this.props.category)}-News MonKEY`;
  }

  async updateNews() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    this.props.setProgress(50);
    await fetch(url)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          articles: result.articles,
          totalResults: result.totalResults,
          isLoaded: true,
        });
      });
    this.props.setProgress(100);
  }

  componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=08c867de13ff4b2fa9613e6e6f07cafc&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    //
    // fetch(url).then((res) => res.json())
    //     .then((result) => {
    //         this.setState({
    //             articles: result.articles,
    //             isLoaded: true,
    //             totalResults: result.totalResults
    //         });
    //     })
    this.updateNews();
  }

  //handlePrevClick = async () => {
  //   //let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=08c867de13ff4b2fa9613e6e6f07cafc&pageSize=${this.props.pageSize}&page=${this.state.page - 1}`;
  //   //this.setState({isLoaded:false});
  //   //fetch(url).then((res) => res.json())
  //   //    .then((result) => {
  //   //        this.setState({
  //   //            page: this.state.page - 1,
  //   //            articles: result.articles,
  //   //            isLoaded: true,
  //   //        });
  //   //    })
  //   this.setState({page: this.state.page-1})
  //   this.updateNews()
  //}

  //handleNextClick = async () => {
  //
  //    //let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=08c867de13ff4b2fa9613e6e6f07cafc&pageSize=${this.props.pageSize}&page=${this.state.page + 1}`;
  //    //this.setState({isLoaded:false});
  //    //fetch(url).then((res) => res.json())
  //    //    .then((result) => {
  //    //        this.setState({
  //    //            page: this.state.page + 1,
  //    //            articles: result.articles,
  //    //            isLoaded: true,
  //    //        });
  //    //    })
  //    this.setState({page: this.state.page+1})
  //    this.updateNews()
  //    }
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`;

    await fetch(url)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          articles: this.state.articles.concat(result.articles),
          totalResults: result.totalResults,
          isLoaded: true,
        });
      });
  };
  render() {
    const { isLoaded, articles } = this.state;
    if (!isLoaded) {
      return (
        <div className="text-center">
          <Spinner />
        </div>
      );
    } else {
      return (
        <div className="container my-3">
          <h1 className="text-center">
            News MonKEY-TOP {this.capitalize(this.props.category)} HEADLINES
          </h1>

          <div className="text-center">{this.state.loading && <Spinner />}</div>
          <div className="container">
            <InfiniteScroll
              dataLength={this.state.articles.length}
              next={this.fetchMoreData}
              hasMore={this.state.articles.length < this.state.totalResults}
              loader={<h4>Loading...</h4>}
            >
              <div className="container">
                <div className="row">
                  {articles.map((element) => (
                    <div className="col-md-4" key={element.url}>
                      <Newsitem
                        title={element.title ? element.title : ""}
                        description={
                          element.description ? element.description : ""
                        }
                        imageUrl={element.urlToImage}
                        newsUrl={element.url}
                        date={element.publishedAt}
                        author={element.author}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </InfiniteScroll>
          </div>
        </div>
      );
    }
  }
}

export default News;
