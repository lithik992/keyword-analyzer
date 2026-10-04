const resumeText = document.getElementById("resumeText");
const jobText = document.getElementById("jobText");

const resumeCount = document.getElementById("resumeCount");
const jobCount = document.getElementById("jobCount");

const analyzeBtn = document.getElementById("analyzeBtn");
const sampleBtn = document.getElementById("sampleBtn");
const clearBtn = document.getElementById("clearBtn");

const resultsSection = document.getElementById("results");

const matchScore = document.getElementById("matchScore");
const scoreLabel = document.getElementById("scoreLabel");
const scoreTitle = document.getElementById("scoreTitle");
const scoreDescription = document.getElementById("scoreDescription");
const scoreProgress = document.getElementById("scoreProgress");

const resumeWords = document.getElementById("resumeWords");
const jobWords = document.getElementById("jobWords");
const matchedCount = document.getElementById("matchedCount");
const missingCount = document.getElementById("missingCount");

const matchedSkills = document.getElementById("matchedSkills");
const missingSkills = document.getElementById("missingSkills");

const strengthScore = document.getElementById("strengthScore");
const strengthProgress = document.getElementById("strengthProgress");


const skillDatabase = [

    "JavaScript",
    "Python",
    "Java",
    "C++",
    "C",
    "HTML",
    "CSS",

    "React",
    "React.js",
    "Angular",
    "Vue",
    "Node.js",
    "Express.js",

    "MongoDB",
    "MySQL",
    "PostgreSQL",
    "SQL",
    "Firebase",

    "Git",
    "GitHub",
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "Google Cloud",

    "REST API",
    "REST APIs",
    "API",

    "TypeScript",
    "Tailwind CSS",
    "Bootstrap",

    "Machine Learning",
    "Artificial Intelligence",
    "Deep Learning",
    "TensorFlow",
    "PyTorch",

    "Data Structures",
    "Algorithms",
    "DSA",

    "Cybersecurity",
    "Linux",
    "DevOps",
    "CI/CD",

    "Figma",
    "UI/UX",

    "Agile",
    "Scrum",

    "Communication",
    "Leadership",
    "Problem Solving"

];


function normalizeText(text) {

    return text
        .toLowerCase()
        .replace(/[^\w\s+#./-]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

}


function countWords(text) {

    const cleanText =
        text.trim();

    if (!cleanText) {
        return 0;
    }

    return cleanText
        .split(/\s+/)
        .length;

}


function updateWordCounts() {

    const resumeTotal =
        countWords(resumeText.value);

    const jobTotal =
        countWords(jobText.value);

    resumeCount.textContent =
        `${resumeTotal} words`;

    jobCount.textContent =
        `${jobTotal} words`;

}


function detectSkills(text) {

    const normalized =
        normalizeText(text);

    return skillDatabase.filter(skill => {

        const skillNormalized =
            normalizeText(skill);

        return normalized.includes(
            skillNormalized
        );

    });

}


function calculateScore(
    resumeSkills,
    jobSkills,
    resumeWordTotal
) {

    if (jobSkills.length === 0) {

        return 0;

    }

    const matched =
        jobSkills.filter(skill =>
            resumeSkills.some(
                resumeSkill =>
                    normalizeText(resumeSkill) ===
                    normalizeText(skill)
            )
        );

    const keywordScore =
        (matched.length / jobSkills.length) * 100;


    const contentBonus =
        resumeWordTotal >= 150
            ? 10
            : resumeWordTotal >= 80
                ? 5
                : 0;


    return Math.min(
        100,
        Math.round(
            keywordScore * 0.9 +
            contentBonus
        )
    );

}


function getScoreDetails(score) {

    if (score >= 80) {

        return {
            label: "STRONG MATCH",
            title: "Your resume is highly relevant!",
            description:
                "Your resume contains most of the important skills detected in the job description."
        };

    }

    if (score >= 60) {

        return {
            label: "GOOD MATCH",
            title: "Your resume is on the right track.",
            description:
                "You have several relevant skills, but adding some missing keywords could improve the match."
        };

    }

    if (score >= 40) {

        return {
            label: "MODERATE MATCH",
            title: "There is room for improvement.",
            description:
                "Your resume matches some requirements, but several relevant skills are missing."
        };

    }

    return {
        label: "LOW MATCH",
        title: "Your resume needs more relevant keywords.",
        description:
            "Consider adding genuine skills, projects and experience that match the target role."
    };

}


function displaySkills(
    container,
    skills,
    type
) {

    if (skills.length === 0) {

        container.innerHTML =
            `<p class="empty-text">
                No relevant keywords detected.
            </p>`;

        return;
    }


    container.innerHTML =
        skills.map(skill => {

            return `
                <span class="skill-tag ${type}">
                    ${escapeHTML(skill)}
                </span>
            `;

        }).join("");

}


function analyzeResume() {

    const resume =
        resumeText.value.trim();

    const job =
        jobText.value.trim();


    if (!resume || !job) {

        alert(
            "Please enter both your resume and the job description."
        );

        return;
    }


    const resumeTotal =
        countWords(resume);

    const jobTotal =
        countWords(job);


    const resumeSkills =
        detectSkills(resume);

    const jobSkills =
        detectSkills(job);


    const matched =
        jobSkills.filter(jobSkill =>
            resumeSkills.some(
                resumeSkill =>
                    normalizeText(resumeSkill) ===
                    normalizeText(jobSkill)
            )
        );


    const missing =
        jobSkills.filter(jobSkill =>
            !resumeSkills.some(
                resumeSkill =>
                    normalizeText(resumeSkill) ===
                    normalizeText(jobSkill)
            )
        );


    const score =
        calculateScore(
            resumeSkills,
            jobSkills,
            resumeTotal
        );


    const details =
        getScoreDetails(score);


    resultsSection.classList.remove(
        "hidden"
    );


    matchScore.textContent =
        `${score}%`;

    scoreLabel.textContent =
        details.label;

    scoreTitle.textContent =
        details.title;

    scoreDescription.textContent =
        details.description;

    scoreProgress.style.width =
        `${score}%`;


    resumeWords.textContent =
        resumeTotal;

    jobWords.textContent =
        jobTotal;

    matchedCount.textContent =
        matched.length;

    missingCount.textContent =
        missing.length;


    displaySkills(
        matchedSkills,
        matched,
        "matched"
    );

    displaySkills(
        missingSkills,
        missing,
        "missing"
    );


    strengthScore.textContent =
        `${score}%`;

    strengthProgress.style.width =
        `${score}%`;


    resultsSection.scrollIntoView({
        behavior: "smooth"
    });

}


function loadSample() {

    resumeText.value = `
John Doe

Full Stack Developer

Skills:
JavaScript, HTML, CSS, React, Node.js, Express.js,
MongoDB, Git, GitHub, REST APIs and Python.

Projects:
Built a responsive e-commerce website using React,
Node.js and MongoDB. Developed REST APIs and implemented
user authentication.

Experience:
Worked with Git and GitHub for version control.
Used JavaScript and React to build reusable components.
`;

    jobText.value = `
We are looking for a Full Stack Developer.

Requirements:
Strong knowledge of JavaScript, React, Node.js,
Express.js and MongoDB.

Experience with Git, GitHub, REST APIs and AWS is preferred.

Knowledge of Docker, SQL and TypeScript is a plus.

Candidates should demonstrate strong problem solving,
communication and teamwork skills.
`;

    updateWordCounts();

}


function clearAll() {

    resumeText.value = "";
    jobText.value = "";

    updateWordCounts();

    resultsSection.classList.add(
        "hidden"
    );

    resumeText.focus();

}


function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


resumeText.addEventListener(
    "input",
    updateWordCounts
);

jobText.addEventListener(
    "input",
    updateWordCounts
);

analyzeBtn.addEventListener(
    "click",
    analyzeResume
);

sampleBtn.addEventListener(
    "click",
    loadSample
);

clearBtn.addEventListener(
    "click",
    clearAll
);


updateWordCounts();