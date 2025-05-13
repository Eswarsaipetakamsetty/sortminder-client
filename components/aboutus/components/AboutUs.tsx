import React from 'react';
import styles from '@/components/aboutus/styles/AboutUs.module.css';

function AboutUs() {
    return (
        <section className={styles.aboutSection}>
            <div className={styles.container}>
                <h1 className={styles.heading}>About SortMinder</h1>
                <p className={styles.tagline}>Master the art of logic and code with challenges that shape your skills.</p>

                <div className={styles.content}>
                    <p>
                        <strong>SortMinder</strong> is your interactive learning platform where problem-solving meets real-world coding. Whether you're preparing for technical interviews, honing your algorithmic thinking, or simply love a good challenge, SortMinder is the place for you.
                    </p>
                    <p>
                        Our goal is to make structured learning fun, engaging, and impactful. We provide a wide range of hand-picked challenges, live coding environments, and intelligent feedback so you can learn, practice, and grow — all in one place.
                    </p>
                    <p>
                        Built by a team of developers and educators, SortMinder values clarity, community, and continuous improvement. We're here to help you stay sharp, sorted, and ready for any challenge that comes your way.
                    </p>
                </div>

                <div className={styles.features}>
                    <div className={styles.feature}>
                        <h3>🔍 Practice-Oriented</h3>
                        <p>Work on challenges modeled after real-life problems and company interview patterns.</p>
                    </div>
                    <div className={styles.feature}>
                        <h3>📈 Track Progress</h3>
                        <p>Monitor your skills, get feedback, and climb the leaderboard.</p>
                    </div>
                    <div className={styles.feature}>
                        <h3>🌐 Community Powered</h3>
                        <p>Join a community of learners, discuss strategies, and learn from others' code.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
