import Layout from "../../components/Layout/Layout";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "./Country.module.css";

const loader = ({ src }) => {
    return `${src}`
}

const getCountry =  async (id) => {
    const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);
    const country = await res.json();
    return country;
}

const Country = ({ country }) => {
    
    const [borders, setBorders] = useState([]);
    const getBorders = async () => {
        const borders = await Promise.all(
            country.borders.map(border => getCountry(border))
        );
        setBorders(borders);
    }
    
    useEffect(() => {
        getBorders();
    });

    console.log(borders);

    return (
        <Layout title={country.name}>
            <div className={styles.container}>
                <div className={styles.container_left}>
                    <div className={styles.overview_panel}>
                        <div className={styles.overview_img}>
                            <Image 
                                loader={loader} 
                                src={country.flag} 
                                width={700}
                                height={500}
                                alt={country.name}
                            />
                        </div>
                        <h1 className={styles.overview_name}>{country.name}</h1>
                        <div className={styles.overview_region}>
                            {country.region}
                        </div>
                        <div className={styles.overview_numbers}>
                            <div className={styles.overview_population}>
                                <div className={styles.overview_value}>
                                    {country.population.toLocaleString().split(/\s/).join(',')}
                                </div>
                                <div className={styles.overview_label}>
                                    Population
                                </div>
                            </div>
                            <div className={styles.overview_area}>
                            <div className={styles.overview_value}>
                                    {country.area.toLocaleString().split(/\s/).join(',')}
                                </div>
                                <div className={styles.overview_label}>
                                    Area (km<sup>2</sup>)
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.container_right}>
                    <div className={styles.details_panel}>
                        <h4 className={styles.details_panel_heading}>Détails</h4>
                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>
                                Capital
                            </div>
                            <div className={styles.details_panel_value}>
                                {country.capital}
                            </div>
                        </div>
                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>
                                Languages
                            </div>
                            <div className={styles.details_panel_value}>
                                {country.languages.map(({ name }) => name).join(", ")}
                            </div>
                        </div>
                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>
                                Currencies
                            </div>
                            <div className={styles.details_panel_value}>
                                {country.currencies.map(({ name }) => name).join(", ")}
                            </div>
                        </div>
                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>
                                Native name
                            </div>
                            <div className={styles.details_panel_value}>
                                {country.nativeName}
                            </div>
                        </div>
                        <div className={styles.details_panel_row}>
                            <div className={styles.details_panel_label}>
                                Gini
                            </div>
                            <div className={styles.details_panel_value}>
                                {country.gini} %
                            </div>
                        </div>
                        <div className={styles.details_panel_borders}>
                            <div className={styles.details_panel_borders_label}>
                                Neighbouring Countries
                            </div>
                            <div className={styles.details_panel_borders_container}>
                                {borders.map(({flag, name}) => (
                                    <div key className={styles.details_panel_borders_country}>
                                        <Image 
                                            loader={loader}
                                            width={500}
                                            height={400}
                                            src={flag} 
                                            alt={name}
                                        />
                                        <div className={styles.details_panel_borders_name}>
                                            {name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Country;

export const getServerSideProps = async ({ params }) => {
    const country = await getCountry(params.id);
    return {
        props: {
            country,
        },
    };
};