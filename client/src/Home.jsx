// eslint-disable-next-line react/prop-types
const Home = ({ props: { user } }) => {

    const userName = user


    return (
        <section className="home">
            <h1>Welcome {userName[0].toUpperCase() + userName.slice(1)}!</h1>
            <p>
                <a href="/login">Sign Out</a>
            </p>
        </section>
    )
}

export default Home