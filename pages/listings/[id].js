import Header from "../../components/Header";
import styles from "../../styles/Listing/Listing.module.css";

const listings = ({ item }) => {
  const { description, image, price, rating, title } = item;
  const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <div className="page-container">
      <Header />
      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <img src={image} alt={title} />
          </div>
          <div className={styles.infoContainer}>
            <div>
              <h1>{title}</h1>
            </div>
            <div className={styles.price}>
              <h2>{priceFormatter.format(price)}</h2>
              {/* <h5>{rating.rate}</h5> */}
            </div>
            <div>
              <p>{description}</p>
            </div>
            <div className={styles.footer}>
              <button>Add to cart</button>
              <button>{`<3`}</button>
            </div>
          </div>
          <button className={styles.return} onClick={() => history.back()}>
            Return
          </button>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const res = await fetch(`https://fakestoreapi.com/products`);
  const data = await res.json();

  const paths = data.map((item) => {
    return {
      params: { id: item.id.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (pageContext) => {
  const id = pageContext.params.id;
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const data = await res.json();

  return {
    props: {
      item: data,
    },
  };
};

export default listings;
