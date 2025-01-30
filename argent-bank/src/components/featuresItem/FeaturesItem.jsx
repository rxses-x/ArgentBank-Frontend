export const FeaturesItem = ({ title, desc, image, children }) => {
    return (
            <div className="feature__item">
            <img src={ image } alt={ desc } className="feature__icon" />
            <h3 className="feature__item-title">{ title }</h3>
            <p>
                { children }
            </p>
        </div>
    )
}