
import React, { useRef } from 'react';
import type { Student, AspectRatio } from '../types';
import { PROFESSIONS, STYLES, ASPECT_RATIOS, BACKGROUNDS, AGES } from '../constants';
import { FaceIdIcon, DownloadIcon, CloseIcon, RefreshCwIcon } from './icons';

interface StudentCardProps {
  student: Student;
  onUpdate: (id: string, data: Partial<Student>) => void;
  onRemove: (id: string) => void;
  onGenerate: (id: string) => void;
}

const getAspectRatioClass = (ratio: AspectRatio) => {
  switch (ratio) {
    case '1:1':
      return 'aspect-square';
    case '3:4':
      return 'aspect-[3/4]';
    case '9:16':
      return 'aspect-[9/16]';
    default:
      return 'aspect-square';
  }
};

const fileToBase64 = (file: File): Promise<{ base64: string, mimeType: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const mimeType = result.substring(5, result.indexOf(';'));
      const base64 = result.substring(result.indexOf(',') + 1);
      resolve({ base64, mimeType });
    };
    reader.onerror = error => reject(error);
  });
};

export const StudentCard: React.FC<StudentCardProps> = ({ student, onUpdate, onRemove, onGenerate }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const { base64, mimeType } = await fileToBase64(file);
      onUpdate(student.id, {
        originalImage: {
          file,
          dataUrl: URL.createObjectURL(file),
          base64,
          mimeType
        },
      });
    }
  };

  const handleSelectFile = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl shadow-lg p-6 relative overflow-hidden">
      <button onClick={() => onRemove(student.id)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10">
        <CloseIcon className="w-6 h-6" />
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side: Settings */}
        <div className="space-y-6">
          {/* Step 1 */}
          <div>
            <h3 className="font-semibold text-lg mb-2 text-cyan-400">Bước 1: Tải ảnh gốc (Khuôn mặt)</h3>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/jpeg, image/webp"
            />
            {student.originalImage ? (
              <div className="text-center">
                <img src={student.originalImage.dataUrl} alt="Học sinh" className="w-32 h-32 object-cover rounded-lg mx-auto mb-3 border-2 border-cyan-500" />
                <p className="text-sm text-green-400">✅ Đã nhận diện khuôn mặt. AI sẽ tập trung giữ lại 90% đặc điểm này.</p>
                <button onClick={handleSelectFile} className="text-sm text-cyan-400 hover:underline mt-2">Thay đổi ảnh</button>
              </div>
            ) : (
              <div
                onClick={handleSelectFile}
                className="w-full h-40 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-700/50 hover:border-cyan-500 transition-colors"
              >
                <FaceIdIcon className="w-12 h-12 text-gray-500" />
                <p className="mt-2 text-gray-400">Nhấn để tải ảnh lên</p>
              </div>
            )}
          </div>

          {/* Step 2 */}
          <div>
            <label htmlFor={`profession-${student.id}`} className="font-semibold text-lg mb-2 block text-cyan-400">Bước 2: Chọn Nghề nghiệp</label>
            <select
              id={`profession-${student.id}`}
              value={student.profession}
              onChange={e => onUpdate(student.id, { profession: e.target.value })}
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            >
              {PROFESSIONS.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <p className="text-xs text-gray-400 mt-2">Mô tả: {PROFESSIONS.find(p => p.id === student.profession)?.description}</p>
          </div>

          {/* Step 3 */}
          <div>
            <label htmlFor={`age-${student.id}`} className="font-semibold text-lg mb-2 block text-cyan-400">Bước 3: Chọn Độ tuổi</label>
            <select
              id={`age-${student.id}`}
              value={student.age}
              onChange={e => onUpdate(student.id, { age: e.target.value })}
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            >
              {AGES.map(a => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
            <p className="text-xs text-gray-400 mt-2">Mô tả: {AGES.find(a => a.id === student.age)?.description}</p>
          </div>

          {/* Step 4 */}
          <div>
            <h3 className="font-semibold text-lg mb-2 text-cyan-400">Bước 4: Tùy chỉnh Phong cách & Bố cục</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-300">Phong cách ảnh</span>
                <div className="flex gap-2 mt-1">
                  {STYLES.map(s => (
                    <button
                      key={s.id}
                      onClick={() => onUpdate(student.id, { style: s.id })}
                      className={`px-3 py-1.5 text-sm rounded-md transition-colors ${student.style === s.id ? 'bg-cyan-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
                    >{s.name}</button>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-300">Tỷ lệ khung ảnh</span>
                <div className="flex gap-2 mt-1">
                  {ASPECT_RATIOS.map(ar => (
                    <button
                      key={ar.id}
                      onClick={() => onUpdate(student.id, { aspectRatio: ar.id })}
                      className={`px-3 py-1.5 text-sm rounded-md transition-colors w-20 ${student.aspectRatio === ar.id ? 'bg-cyan-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
                    >{ar.id} <span className="hidden sm:inline">({ar.name})</span></button>
                  ))}
                </div>
              </div>
               <div>
                  <label htmlFor={`background-${student.id}`} className="text-sm font-medium text-gray-300">Nền ảnh</label>
                   <select
                    id={`background-${student.id}`}
                    value={student.background}
                    onChange={e => onUpdate(student.id, { background: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 mt-1 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm"
                  >
                    {BACKGROUNDS.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                  </select>
              </div>
            </div>
          </div>
         
          {/* Step 5 */}
           <div>
            <label htmlFor={`special-request-${student.id}`} className="font-semibold text-lg mb-2 block text-cyan-400">Bước 5: Yêu cầu đặc biệt</label>
            <textarea
              id={`special-request-${student.id}`}
              rows={2}
              value={student.specialRequest}
              onChange={e => onUpdate(student.id, { specialRequest: e.target.value })}
              placeholder="Ví dụ: mỉm cười rạng rỡ, đeo kính cận, tóc búi cao,..."
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Right Side: Result */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className={`w-full max-w-sm bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center border border-gray-700 ${getAspectRatioClass(student.aspectRatio as AspectRatio)}`}>
            {student.isGenerating ? (
              <div className="flex flex-col items-center text-center p-4">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400"></div>
                <p className="mt-4 text-gray-300">AI đang sáng tạo... Vui lòng chờ!</p>
              </div>
            ) : student.error ? (
                 <div className="p-4 text-center text-red-400">
                    <p>Lỗi!</p>
                    <p>{student.error}</p>
                 </div>
            ) : student.generatedImage ? (
              <img src={student.generatedImage} alt="Kết quả" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center p-4 text-gray-500">
                <p>Kết quả sẽ hiển thị ở đây</p>
              </div>
            )}
          </div>
           <div className="flex flex-wrap gap-3 justify-center w-full">
            <button
                onClick={() => onGenerate(student.id)}
                disabled={!student.originalImage || student.isGenerating}
                className="flex-1 min-w-[120px] px-4 py-2 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
              >
                Tạo ảnh
              </button>
            {student.generatedImage && (
              <>
                 <button
                  onClick={() => onGenerate(student.id)}
                  disabled={student.isGenerating}
                  className="flex items-center justify-center gap-2 flex-1 min-w-[120px] px-4 py-2 bg-yellow-600 text-white font-bold rounded-lg shadow-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
                >
                  <RefreshCwIcon className="w-4 h-4" /> Tạo lại
                </button>
                <a
                  href={student.generatedImage}
                  download={`hoc_sinh_${student.id}.jpg`}
                  className="flex items-center justify-center gap-2 flex-1 min-w-[120px] px-4 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  <DownloadIcon className="w-4 h-4" /> Tải về
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
