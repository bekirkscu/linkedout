import { useLocation } from 'react-router-dom';

function ExperienceItem({ experience, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm p-4 mb-4 transition-all">
      <div className="flex justify-between items-center">
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 w-full">
          <p className="text-lg font-semibold">{experience.title}</p>
          <p className="text-sm text-gray-500">{experience.dates}</p>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="ml-4 text-sm text-blue-600 hover:underline"
        >
          {expanded ? 'Hide details' : 'Show details'}
        </button>
      </div>

      {expanded && (
        <div className="mt-3 text-gray-600">
          <p>{experience.details}</p>
        </div>
      )}
    </div>
  );
}

function ProfilePreview() {
  const location = useLocation();
  const { name, tagline, about, skills, experience } = location.state || {};

  if (!location.state) {
    return <p className="text-center mt-10 text-gray-600">No profile data to preview.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-blue-600">{name}'s Profile</h1>
          <p className="text-gray-600 mt-1">Preview your profile below</p>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto space-y-8">
        {/* Name */}
        <div>
          <h2 className="font-medium text-xl mb-2">📛 Name</h2>
          <p className="text-lg">{name}</p>
        </div>

        {/* Tagline */}
        <div>
          <h2 className="font-medium text-xl mb-2">📝 Tagline</h2>
          <p className="text-lg text-gray-600">{tagline}</p>
        </div>

        {/* About Me */}
        <div>
          <h2 className="font-medium text-xl mb-2">📄 About Me</h2>
          <p className="text-lg text-gray-600">{about}</p>
        </div>

        {/* Skills */}
        <div>
          <h2 className="font-medium text-xl mb-2">🛠️ Skills</h2>
          <ul className="list-disc list-inside">
            {skills.map((skill, index) => (
              <li key={index} className="text-lg text-gray-600">{skill}</li>
            ))}
          </ul>
        </div>

        {/* Experience */}
        <div>
          <h2 className="font-medium text-xl mb-2">💼 Experience</h2>
          {experience && experience.map((exp, index) => (
            <ExperienceItem key={index} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfilePreview;
