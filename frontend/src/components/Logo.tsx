type Props = {
  textClassName?: string;
  containerClassName?: string;
};

const Logo = ({ textClassName = 'text-gray-900', containerClassName = '' }: Props) => (
  <div className={`flex items-center ${containerClassName}`}>
    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
      <span className="text-white font-bold text-xl">P+</span>
    </div>
    <span className={`ml-3 text-xl font-bold ${textClassName}`}>PharmaConnect</span>
  </div>
);

export default Logo;
