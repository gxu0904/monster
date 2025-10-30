'use client';

export default function ResumeWindow() {
  const resumeText = `# Grace Xu
Full-Stack Developer & Product Designer

grace@example.com | San Francisco, CA
github.com/gracexu | linkedin.com/in/gracexu

## Education
Stanford University | 2024 - Present
Bachelor of Science in Computer Science

## Experience
Nano-Grinding Research Assistant | 2024
- Developed MATLAB/Python tools analyzing 15K+ simulations
- Improved surface finish quality by 28%

M&TSI Research Intern | MIT | 2023
- Built ML model with 91% accuracy for traffic prediction
- Trained on 2.3M data points

FIRST Robotics Programming Lead | 2022-2023
- Led development of scouting system tracking 60+ teams
- Achieved 78% match outcome accuracy

## Technical Skills
Languages: TypeScript, Python, Java, C++, SQL
Frontend: React, Next.js, Vue.js, Tailwind CSS
Backend: Node.js, Express, PostgreSQL, MongoDB
`;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-3xl font-pixel text-blue-700">Resume</h1>
        <a
          href="/resume.pdf"
          download
          className="retro-button px-4 py-2 flex items-center gap-2"
        >
          <span>📄</span>
          <span>Download PDF</span>
        </a>
      </div>

      <div className="prose prose-sm max-w-none">
        <div className="bg-white p-8 border-2 border-gray-300 font-mono text-sm whitespace-pre-wrap">
          {resumeText}
        </div>
      </div>
    </div>
  );
}
