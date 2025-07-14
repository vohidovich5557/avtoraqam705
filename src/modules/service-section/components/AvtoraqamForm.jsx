import { useState } from 'react';
import { IMaskInput } from 'react-imask';
import {toast} from "sonner";

const BOT_TOKEN = 'YOUR_BOT_TOKEN';
const CHAT_ID = 'YOUR_CHAT_ID';

export const AvtoraqamForm = () => {
    const [isYuridik, setIsYuridik] = useState(false);
    const [autoNumber, setAutoNumber] = useState('');
    const [phone, setPhone] = useState('');
    const [passport, setPassport] = useState('');

    const handleSubmit = async () => {
        if (!autoNumber || !phone || !passport) {
            toast.error('Iltimos hamma maydonni to`g`ri to`ldiring');
            return;
        }

        const message = `
🚗 *Avtoraqam So'rov*:
👤 Turi: ${isYuridik ? 'Yuridik' : 'Jismoniy'}
🔢 Avtoraqam: ${autoNumber}
📱 Telefon: ${phone}
🆔 Pasport: ${passport}
`;

        try {
            await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message,
                    parse_mode: 'Markdown',
                }),
            });

            toast.success('Ma\'lumotlar yuborildi ✅')
            setAutoNumber('');
            setPhone('');
            setPassport('');
        } catch (error) {
            toast.error('Yuborishda xatolik yuz berdi ❌');
        }
    };

    const handleToggle = (value) => {
        setIsYuridik(value);
        setAutoNumber(''); // ← Clear the autoNumber input when switching
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-between px-[10px] py-4">

            <div className="w-full h-full flex flex-col items-center gap-[16px]">
                {/* Toggle Type */}
                <div className="flex gap-3">
                    <button
                        onClick={() => handleToggle(false)}
                        className={`px-4 py-2 rounded-md text-sm font-medium ${
                            !isYuridik ? 'bg-[#258385] text-white' : 'bg-white text-[#258385] border'
                        }`}
                    >
                        Jismoniy
                    </button>
                    <button
                        onClick={() => handleToggle(true)}
                        className={`px-4 py-2 rounded-md text-sm font-medium ${
                            isYuridik ? 'bg-[#258385] text-white' : 'bg-white text-[#258385] border'
                        }`}
                    >
                        Yuridik
                    </button>
                </div>

                {/* Auto Number */}
                <IMaskInput
                    mask={isYuridik ? '00|000aaa' : '00|a000aa'}
                    definitions={{
                        a: /[A-Za-z]/,
                    }}
                    value={autoNumber}
                    unmask={false}
                    onAccept={(value) => setAutoNumber(value.toUpperCase())}
                    placeholder={isYuridik ? '01|001AAA' : '01|A001AA'}
                    className="border w-full focus:border-[#258385] px-4 py-4 rounded-md placeholder:text-[18px] text-[16px]  text-[#258385] outline-none uppercase"
                />

                {/* Phone Number */}
                <IMaskInput
                    mask="+998 00 000 00 00"
                    value={phone}
                    unmask={false}
                    onAccept={(value) => setPhone(value)}
                    placeholder="+998 90 123 45 67"
                    className="border w-full focus:border-[#258385] px-4 py-4 rounded-md text-[#258385] placeholder:text-[16px] text-[16px] outline-none"
                />

                {/* Passport */}
                <IMaskInput
                    mask="aa 000 00 00"
                    definitions={{
                        a: /[A-Za-z]/, // allow lowercase or uppercase
                    }}
                    value={passport}
                    unmask={false}
                    onAccept={(value) => setPassport(value.toUpperCase())}
                    placeholder="AA 123 45 67"
                    className="border w-full focus:border-[#258385] px-4 py-4 rounded-md placeholder:text-[16px] text-[16px]  text-[#258385] outline-none uppercase"
                />
            </div>

            {/* Submit */}
            <button
                onClick={handleSubmit}
                className="mt-4 w-full  px-6 py-4 bg-[#258385] text-white rounded-md font-semibold hover:bg-[#1f6c6d] transition"
            >
                Yuborish
            </button>
        </div>
    );
};
