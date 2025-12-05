
import type { AspectRatio } from './types';

export const PROFESSIONS = [
  { id: 'csgt', name: 'Công an Giao thông (CSGT)', description: 'Áo sơ mi CSGT màu vàng nắng, mũ kê-pi trắng viền xanh, ve áo, gậy chỉ huy' },
  { id: 'cscd', name: 'Cảnh sát Cơ động (CSCĐ)', description: 'Trang phục dã chiến màu đen tuyền, mũ bảo hiểm chuyên dụng có chữ CSCĐ, áo giáp, súng' },
  { id: 'anninh', name: 'Công an An ninh/Nhân dân', description: 'Trang phục an ninh màu xanh rêu sẫm (màu mạ non), mũ kê-pi cùng màu, ve áo, sao' },
  { id: 'bodoi', name: 'Chiến sĩ Bộ đội (Lục quân)', description: 'Trang phục dã chiến rằn ri K07, mũ cối hoặc mũ mềm rằn ri, súng' },
  { id: 'doctor', name: 'Bác sĩ', description: 'Áo blouse trắng tinh, cổ bẻ, đeo ống nghe quanh cổ, túi áo' },
  { id: 'teacher', name: 'Giáo viên (Nam/Nữ)', description: 'Trang phục công sở lịch sự, đứng trên bục giảng, tay cầm sách/phấn' },
  { id: 'engineer', name: 'Thợ xây/Kỹ sư công trường', description: 'Mũ bảo hộ màu vàng, áo bảo hộ lao động màu cam/xanh' },
  { id: 'student_card', name: 'Học sinh (Ảnh thẻ)', description: 'Mặc đồng phục áo sơ mi trắng, thắt khăn quàng đỏ, chụp chính diện' },
];

export const STYLES = [
  { id: 'realistic', name: 'Chân thực' },
  { id: 'pixar', name: 'Chibi 3D (Kiểu Pixar)' },
  { id: 'ghibli', name: 'Ghibli 2D (Hoạt hình Nhật Bản)' },
];

export const ASPECT_RATIOS: { id: AspectRatio; name: string }[] = [
  { id: '1:1', name: 'Vuông' },
  { id: '3:4', name: 'Dọc chuẩn' },
  { id: '9:16', name: 'Story/Reels' },
];

export const BACKGROUNDS = [
  { id: 'contextual', name: 'Nền bối cảnh (Mặc định)' },
  { id: 'white', name: 'Nền đơn sắc: Trắng' },
  { id: 'blue', name: 'Nền đơn sắc: Xanh dương' },
  { id: 'gray', name: 'Nền đơn sắc: Xám nhạt' },
];

export const AGES = [
  { id: 'auto', name: 'Tự động phát hiện', description: 'AI sẽ tự động phân tích và giữ nguyên độ tuổi từ ảnh gốc.' },
  { id: 'preschool', name: 'Mầm non (3-5 tuổi)', description: 'Tạo hình ảnh phù hợp với lứa tuổi mầm non, ngây thơ, đáng yêu.' },
  { id: 'primary', name: 'Tiểu học (6-10 tuổi)', description: 'Tạo hình ảnh phù hợp với lứa tuổi học sinh tiểu học, năng động, trong sáng.' },
  { id: 'secondary', name: 'THCS (11-15 tuổi)', description: 'Tạo hình ảnh phù hợp với lứa tuổi học sinh trung học cơ sở, chững chạc hơn.' },
  { id: 'highschool', name: 'THPT (16-18 tuổi)', description: 'Tạo hình ảnh phù hợp với lứa tuổi học sinh trung học phổ thông, trưởng thành.' },
];
