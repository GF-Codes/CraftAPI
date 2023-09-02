import styles from './MobCard.module.css';

// eslint-disable-next-line react/prop-types
function MobCard({ image, name, type }) {
    return (
        <>
            <section className={styles.card}>
                <div>
                    <img src={image} alt={name} />
                    <h2>{name}</h2>
                    <hr />
                    <h4>Tipo: {type}</h4>
                </div>
            </section>
        </>
    )
}

export default MobCard