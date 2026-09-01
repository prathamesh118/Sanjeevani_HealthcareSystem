import React from 'react';
import logoImg from '../assets/images/sanjeevani-logo.png';

interface SanjeevaniLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  badge?: React.ReactNode;
  facilitySubtitle?: string;
}

export const SanjeevaniLogo: React.FC<SanjeevaniLogoProps> = ({
  size = 'md',
  className = '',
  badge,
  facilitySubtitle
}) => {
  if (size === 'sm') {
    return (
      <div className={`flex items-center space-x-2.5 ${className}`}>
        <img
          src={logoImg}
          alt="Sanjeevani - Connecting Communities to Care"
          className="h-8 sm:h-9 w-auto object-contain shrink-0"
          referrerPolicy="no-referrer"
        />
        {(badge || facilitySubtitle) && (
          <div className="flex flex-col">
            {badge && <div>{badge}</div>}
            {facilitySubtitle && (
              <span className="text-[10px] text-slate-400 font-medium truncate max-w-[180px] sm:max-w-none">
                {facilitySubtitle}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }

  if (size === 'md') {
    return (
      <div className={`flex items-center gap-3 sm:gap-4 ${className}`}>
        <div className="shrink-0 flex items-center">
          <img
            src={logoImg}
            alt="Sanjeevani - Connecting Communities to Care"
            className="h-11 sm:h-13 md:h-14 w-auto max-w-[210px] sm:max-w-[260px] md:max-w-[300px] object-contain transition-all"
            referrerPolicy="no-referrer"
          />
        </div>

        {(badge || facilitySubtitle) && (
          <div className="flex flex-col justify-center space-y-0.5 pl-2.5 sm:pl-3.5 border-l border-slate-200">
            {badge && <div className="flex items-center">{badge}</div>}
            {facilitySubtitle && (
              <span className="text-[11px] font-medium text-slate-500 truncate max-w-[180px] sm:max-w-[260px] md:max-w-none">
                {facilitySubtitle}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }

  if (size === 'lg') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <img
          src={logoImg}
          alt="Sanjeevani - Connecting Communities to Care"
          className="h-16 sm:h-20 md:h-24 w-auto max-w-[300px] sm:max-w-[380px] object-contain drop-shadow-sm mb-1.5"
          referrerPolicy="no-referrer"
        />
        {badge && <div className="mt-1">{badge}</div>}
        {facilitySubtitle && (
          <div className="text-xs text-slate-500 font-medium mt-1">
            {facilitySubtitle}
          </div>
        )}
      </div>
    );
  }

  // size === 'xl'
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <img
        src={logoImg}
        alt="Sanjeevani - Connecting Communities to Care"
        className="h-20 sm:h-28 md:h-36 w-auto max-w-[85vw] object-contain drop-shadow-md"
        referrerPolicy="no-referrer"
      />
      {badge && <div className="mt-2">{badge}</div>}
    </div>
  );
};

