import React, { useState, useCallback } from 'react';
// --- CÁC IMPORT GỐC CỦA THẦY ĐƯỢC GIỮ NGUYÊN ---
import { StudentCard } from './components/StudentCard';
import type { Student } from './types';
import { generateImage } from './services/geminiService';

// --- PHẦN 1: ĐOẠN CODE MODAL QUẢNG CÁO ĐƯỢC THÊM VÀO ---
const SplashModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4"
      onClick={onClose} 
    >
      <div
        className="bg-gray-800 p-4 rounded-lg shadow-xl relative max-w-lg w-full"
        onClick={(e) => e.stopPropagation()} 
      >
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 bg-red-600 text-white rounded-full w-9 h-9 flex items-center justify-center text-2xl font-bold hover:bg-red-700 transition-all focus:outline-none ring-2 ring-white"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-center mb-4 text-cyan-400">WELLCOME</h2>
        <div className="w-full h-auto rounded-md overflow-hidden border-2 border-cyan-500">
          <img
            src="https://archive.org/details/123_20251205.jpg"
            alt="WELLCOME"
            className="w-full h-auto object-cover"
            onError={(e) => (e.currentTarget.src = 'https://placehold.co/600x400/0f172a/93c5fd?text=ƯỚC+MƠ+CỦA+EM')}
          />
        </div>
        <p className="text-center text-gray-300 mt-4">
          Chào mừng các em đến với ƯỚC MƠ CỦA EM!
        </p>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-cyan-600 text-white font-semibold py-2.5 rounded-lg hover:bg-cyan-700 transition-all"
        >
          Bắt đầu sử dụng
        </button>
      </div>
    </div>
  );
};
// --- HẾT PHẦN THÊM 1 ---

const App: React.FC = () => {
  // --- PHẦN 2: THÊM 1 DÒNG STATE ĐỂ ĐIỀU KHIỂN ---
  const [showSplash, setShowSplash] = useState(true);

  // --- CODE GỐC CỦA THẦY (GIỮ NGUYÊN) ---
  const [students, setStudents] = useState<Student[]>([
    {
      id: crypto.randomUUID(),
      profession: 'doctor',
      age: 'auto',
      style: 'realistic',
      aspectRatio: '3:4',
      background: 'contextual',
      specialRequest: '',
      isGenerating: false,
    },
  ]);

  const addStudent = () => {
    setStudents(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        profession: 'doctor',
        age: 'auto',
        style: 'realistic',
        aspectRatio: '3:4',
        background: 'contextual',
        specialRequest: '',
        isGenerating: false,
      },
    ]);
  };

  const removeStudent = (id: string) => {
    setStudents(prev => prev.filter(student => student.id !== id));
  };

  const updateStudent = (id: string, updatedData: Partial<Student>) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === id ? { ...student, ...updatedData } : student
      )
    );
  };

  const handleGenerate = useCallback(async (id: string) => {
    const student = students.find(s => s.id === id);
    if (!student || !student.originalImage) return;

    updateStudent(id, { isGenerating: true, error: undefined, generatedImage: undefined });
    try {
      const imageB64 = await generateImage(student);
      updateStudent(id, { generatedImage: `data:image/jpeg;base64,${imageB64}`, isGenerating: false });
    } catch (error) {
      console.error('Image generation failed:', error);
      updateStudent(id, { isGenerating: false, error: 'Tạo ảnh thất bại. Vui lòng thử lại.' });
    }
  }, [students]);

  const handleGenerateAll = async () => {
    const studentsToGenerate = students.filter(s => s.originalImage && !s.isGenerating);
    for (const student of studentsToGenerate) {
      await handleGenerate(student.id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-50 font-sans">
      
      {/* --- PHẦN 3: THÊM 1 DÒNG ĐỂ HIỂN THỊ MODAL --- */}
      {showSplash && <SplashModal onClose={() => setShowSplash(false)} />}
      
      {/* --- CODE GỐC CỦA THẦY (GIỮ NGUYÊN) --- */}
      <main className="container mx-auto px-4 py-8 pb-32">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            ƯỚC MƠ CỦA EM
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Tải ảnh học sinh, chọn nghề nghiệp mơ ước và xem kết quả kỳ diệu!
          </p>
        </header>

        <div className="space-y-8">
          {students.map(student => (
            <StudentCard
              key={student.id}
              student={student}
              onUpdate={updateStudent}
              onRemove={removeStudent}
              onGenerate={handleGenerate}
            />
          ))}
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-sm border-t border-gray-700 p-3 z-50">
        <div className="container mx-auto flex flex-col items-center justify-center gap-2">
           <div className="flex items-center justify-center gap-4">
              <button
                onClick={addStudent}
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition-transform transform hover:scale-105"
              >
                + Thêm Học Sinh
              </button>
              <button
                onClick={handleGenerateAll}
                className="px-6 py-3 bg-cyan-600 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-75 transition-transform transform hover:scale-105"
              >
                Tạo Tất Cả
              </button>
           </div>
           <p className="text-xs text-gray-400">Designed by Love Le @ 2025 By Love le | 0971738589 </p>
        </div>
      </footer>
    </div>
  );
};

export default App;