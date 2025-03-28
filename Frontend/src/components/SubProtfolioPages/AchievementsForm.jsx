// // AchievementsForm.jsx
// import React, { useState } from 'react';
// import { PlusCircle, Trash2 } from 'lucide-react';

// const AchievementsForm = () => {
//   const [formData, setFormData] = useState({
//     academicAchievements: [],
//     certifications: [],
//     projects: [],
//     extraCurricular: []
//   });

//   const handleChange = (e, index, category, field) => {
//     const updatedData = [...formData[category]];
//     updatedData[index][field] = e.target.value;
//     setFormData(prev => ({
//       ...prev,
//       [category]: updatedData
//     }));
//   };

//   const addNewEntry = (category, newEntry) => {
//     setFormData(prev => ({
//       ...prev,
//       [category]: [...(prev[category] || []), newEntry]
//     }));
//   };

//   const removeEntry = (category, index) => {
//     setFormData(prev => ({
//       ...prev,
//       [category]: prev[category].filter((_, i) => i !== index)
//     }));
//   };

//   const renderSection = (title, category, fields, emptyEntry) => (
//     <div className="bg-white p-6 rounded-xl shadow-sm border border-pink-100">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-lg font-semibold text-pink-800">{title}</h3>
//         <button 
//           onClick={() => addNewEntry(category, emptyEntry)} 
//           className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
//         >
//           <PlusCircle className="w-4 h-4" />
//           Add New
//         </button>
//       </div>
      
//       <div className="space-y-4">
//         {(formData[category] || []).map((item, index) => (
//           <div key={index} className="relative bg-white p-6 rounded-lg shadow-sm border border-pink-200">
//             <div className="absolute -left-3 -top-3 w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">
//               {index + 1}
//             </div>
//             <button
//               onClick={() => removeEntry(category, index)}
//               className="absolute top-2 right-2 text-pink-400 hover:text-pink-600 transition-colors"
//             >
//               <Trash2 className="w-5 h-5" />
//             </button>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
//               {fields.map(({ name, type, placeholder, fullWidth }) => (
//                 <div key={name} className={fullWidth ? "md:col-span-2" : ""}>
//                   <label className="block text-sm font-medium text-pink-700 mb-1">
//                     {placeholder}
//                   </label>
//                   {type === 'textarea' ? (
//                     <textarea
//                       value={item[name]}
//                       onChange={(e) => handleChange(e, index, category, name)}
//                       placeholder={placeholder}
//                       className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 min-h-[100px]"
//                     />
//                   ) : (
//                     <input
//                       type={type}
//                       value={item[name]}
//                       onChange={(e) => handleChange(e, index, category, name)}
//                       placeholder={placeholder}
//                       className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   return (
//     <div >
//       <h2 className="text-3xl font-bold text-black mb-8">Achievements</h2>
      
//       <div className="space-y-8">
//         {renderSection("Academic Achievements", "academicAchievements", [
//           { name: "title", type: "text", placeholder: "Achievement Title" },
//           { name: "year", type: "number", placeholder: "Year" }
//         ], { title: '', year: '' })}

//         {renderSection("Certifications", "certifications", [
//           { name: "title", type: "text", placeholder: "Certification Name" },
//           { name: "year", type: "number", placeholder: "Year" },
//           { name: "issuer", type: "text", placeholder: "Issuing Organization", fullWidth: true }
//         ], { title: '', year: '', issuer: '' })}

//         {renderSection("Projects", "projects", [
//           { name: "name", type: "text", placeholder: "Project Name" },
//           { name: "year", type: "number", placeholder: "Year" },
//           { name: "technology", type: "text", placeholder: "Technologies Used", fullWidth: true },
//           { name: "description", type: "textarea", placeholder: "Project Description", fullWidth: true }
//         ], { name: '', year: '', technology: '', description: '' })}

//         {renderSection("Extra-curricular Activities", "extraCurricular", [
//           { name: "title", type: "text", placeholder: "Activity Name" },
//           { name: "year", type: "number", placeholder: "Year" },
//           { name: "role", type: "text", placeholder: "Your Role", fullWidth: true }
//         ], { title: '', year: '', role: '' })}
//       </div>
//     </div>
//   );
// };

// export default AchievementsForm;


// AchievementsForm.jsx
import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import { db } from '../../firebase/config';
import { doc, setDoc } from 'firebase/firestore';

const AchievementsForm = ({ formData = {}, setFormData, userId }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('AchievementsForm received formData:', formData);
    console.log('AchievementsForm received userId:', userId);
  }, [formData, userId]);

  const handleChange = (e, index, category, field) => {
    const updatedData = [...(formData[category] || [])];
    updatedData[index] = { ...updatedData[index], [field]: e.target.value };
    setFormData({ ...formData, [category]: updatedData }); // Update parent state directly
    console.log(`Updated ${category} at index ${index}:`, updatedData);
  };

  const addNewEntry = (category, newEntry) => {
    const updatedData = [...(formData[category] || []), newEntry];
    setFormData({ ...formData, [category]: updatedData });
    console.log(`Added new entry to ${category}:`, updatedData);
  };

  const removeEntry = (category, index) => {
    const updatedData = (formData[category] || []).filter((_, i) => i !== index);
    setFormData({ ...formData, [category]: updatedData });
    console.log(`Removed entry from ${category} at index ${index}:`, updatedData);
  };

  const handleSubmit = async () => {
    try {
      if (!userId) {
        throw new Error('User ID is missing. Please register or log in first.');
      }

      const achievementsData = {
        academicAchievements: formData.academicAchievements || [],
        certifications: formData.certifications || [],
        projects: formData.projects || [],
        extraCurricular: formData.extraCurricular || [],
        userId,
        updatedAt: new Date().toISOString(),
      };

      await setDoc(doc(db, 'achievements', userId), achievementsData, { merge: true });
      alert('Achievements saved successfully!');
    } catch (err) {
      console.error('Error saving achievements:', err.message);
      setError(`Failed to save achievements: ${err.message}`);
    }
  };

  const renderSection = (title, category, fields, emptyEntry) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-pink-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-pink-800">{title}</h3>
        <button
          onClick={() => addNewEntry(category, emptyEntry)}
          className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          Add New
        </button>
      </div>

      <div className="space-y-4">
        {(formData[category] || []).map((item, index) => (
          <div key={index} className="relative bg-white p-6 rounded-lg shadow-sm border border-pink-200">
            <div className="absolute -left-3 -top-3 w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">
              {index + 1}
            </div>
            <button
              onClick={() => removeEntry(category, index)}
              className="absolute top-2 right-2 text-pink-400 hover:text-pink-600 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {fields.map(({ name, type, placeholder, fullWidth }) => (
                <div key={name} className={fullWidth ? 'md:col-span-2' : ''}>
                  <label className="block text-sm font-medium text-pink-700 mb-1">{placeholder}</label>
                  {type === 'textarea' ? (
                    <textarea
                      value={item[name] || ''}
                      onChange={(e) => handleChange(e, index, category, name)}
                      placeholder={placeholder}
                      className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 min-h-[100px]"
                    />
                  ) : (
                    <input
                      type={type}
                      value={item[name] || ''}
                      onChange={(e) => handleChange(e, index, category, name)}
                      placeholder={placeholder}
                      className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <h2 className="text-3xl font-bold text-black mb-8">Achievements</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="space-y-8">
        {renderSection(
          'Academic Achievements',
          'academicAchievements',
          [
            { name: 'title', type: 'text', placeholder: 'Achievement Title' },
            { name: 'year', type: 'number', placeholder: 'Year' },
          ],
          { title: '', year: '' }
        )}

        {renderSection(
          'Certifications',
          'certifications',
          [
            { name: 'title', type: 'text', placeholder: 'Certification Name' },
            { name: 'year', type: 'number', placeholder: 'Year' },
            { name: 'issuer', type: 'text', placeholder: 'Issuing Organization', fullWidth: true },
          ],
          { title: '', year: '', issuer: '' }
        )}

        {renderSection(
          'Projects',
          'projects',
          [
            { name: 'name', type: 'text', placeholder: 'Project Name' },
            { name: 'year', type: 'number', placeholder: 'Year' },
            { name: 'technology', type: 'text', placeholder: 'Technologies Used', fullWidth: true },
            { name: 'description', type: 'textarea', placeholder: 'Project Description', fullWidth: true },
          ],
          { name: '', year: '', technology: '', description: '' }
        )}

        {renderSection(
          'Extra-curricular Activities',
          'extraCurricular',
          [
            { name: 'title', type: 'text', placeholder: 'Activity Name' },
            { name: 'year', type: 'number', placeholder: 'Year' },
            { name: 'role', type: 'text', placeholder: 'Your Role', fullWidth: true },
          ],
          { title: '', year: '', role: '' }
        )}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Save Achievements
      </button>
    </div>
  );
};

export default AchievementsForm;