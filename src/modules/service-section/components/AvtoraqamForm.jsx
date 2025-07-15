import { useState } from 'react';
import { IMaskInput } from 'react-imask';
import { toast } from 'sonner';

function escapeMarkdown(text) {
    return text
        .replace(/\\/g, '\\\\')
        .replace(/_/g, '\\_')
        .replace(/\*/g, '\\*')
        .replace(/\[/g, '\\[')
        .replace(/\]/g, '\\]')
        .replace(/\(/g, '\\(')
        .replace(/\)/g, '\\)')
        .replace(/~/g, '\\~')
        .replace(/`/g, '\\`')
        .replace(/>/g, '\\>')
        .replace(/#/g, '\\#')
        .replace(/\+/g, '\\+')
        .replace(/-/g, '\\-')
        .replace(/=/g, '\\=')
        .replace(/\|/g, '\\|')
        .replace(/\{/g, '\\{')
        .replace(/\}/g, '\\}')
        .replace(/\./g, '\\.')
        .replace(/!/g, '\\!');
}

const BOT_TOKEN = '8005450451:AAEj4m1FAovWc8P4wna4QIbS21JaAXsqD6o';
const CHAT_ID = '1163282279';

export const AvtoraqamForm = () => {
    const [isYuridik, setIsYuridik] = useState(false);
    const [autoNumber, setAutoNumber] = useState('');
    const [phone, setPhone] = useState('');
    const [passport, setPassport] = useState('');
    const [fio, setFio] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if (!autoNumber || !phone || !passport) {
            toast.error('Iltimos hamma maydonni to`g`ri to`ldiring');
            return;
        }

        setIsLoading(true);

        const message = `
🚗 *Avtoraqam So'rov*:
👤 Turi: ${escapeMarkdown(isYuridik ? 'Yuridik' : 'Jismoniy')}
🔢 Avtoraqam: ${escapeMarkdown(autoNumber)}
📱 Telefon: ${escapeMarkdown(phone)}
🆔 Pasport: ${escapeMarkdown(passport)}
📝 F\\.I\\.O\\: ${escapeMarkdown(fio)}
`;

        try {
            await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message,
                    parse_mode: 'MarkdownV2',
                }),
            });

            toast.success("Ma'lumotlar yuborildi ✅");
            setAutoNumber('');
            setPhone('');
            setPassport('');
            setFio('');
        } catch {
            toast.error('Yuborishda xatolik yuz berdi ❌');
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggle = (value) => {
        setIsYuridik(value);
        setAutoNumber('');
    };

    return (
        <div className="relative w-full h-full flex flex-col justify-between px-[10px] py-4 overflow-hidden">

            {/* Scrollable Inputs Area */}
            <div className={`flex-1 overflow-auto flex flex-col items-center gap-[16px] pr-1 ${isLoading ? 'blur-sm pointer-events-none' : ''}`}>

                {/* Toggle */}
                <div className="flex gap-3">
                    <button
                        onClick={() => handleToggle(false)}
                        className={`px-4 py-2 rounded-md text-sm font-medium ${!isYuridik ? 'bg-[#258385] text-white' : 'bg-white text-[#258385] border'}`}
                    >
                        Jismoniy
                    </button>
                    <button
                        onClick={() => handleToggle(true)}
                        className={`px-4 py-2 rounded-md text-sm font-medium ${isYuridik ? 'bg-[#258385] text-white' : 'bg-white text-[#258385] border'}`}
                    >
                        Yuridik
                    </button>
                </div>

                {/* Auto Number */}
                <div className="w-full flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#258385]">Qiziqgan avtoraqam kiriting</label>
                    <IMaskInput
                        mask={isYuridik ? '00|000aaa' : '00|a000aa'}
                        definitions={{ a: /[A-Za-z]/ }}
                        value={autoNumber}
                        unmask={false}
                        onAccept={(value) => setAutoNumber(value.toUpperCase())}
                        placeholder={isYuridik ? '01|001AAA' : '01|A001AA'}
                        className="border w-full focus:border-[#258385] px-4 py-4 rounded-md placeholder:text-[18px] text-[16px] text-[#258385] outline-none uppercase"
                    />
                </div>

                {/* Phone Number */}
                <div className="w-full flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#258385]">Telefon raqam</label>
                    <IMaskInput
                        mask="+998 00 000 00 00"
                        value={phone}
                        unmask={false}
                        onAccept={(value) => setPhone(value)}
                        placeholder="+998 90 123 45 67"
                        className="border w-full focus:border-[#258385] px-4 py-4 rounded-md text-[#258385] placeholder:text-[16px] text-[16px] outline-none"
                    />
                </div>

                {/* Passport */}
                <div className="w-full flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#258385]">Pasport seriya va raqamingiz</label>
                    <IMaskInput
                        mask="aa 000 00 00"
                        definitions={{ a: /[A-Za-z]/ }}
                        value={passport}
                        unmask={false}
                        onAccept={(value) => setPassport(value.toUpperCase())}
                        placeholder="AA 123 45 67"
                        className="border w-full focus:border-[#258385] px-4 py-4 rounded-md placeholder:text-[16px] text-[16px] text-[#258385] outline-none uppercase"
                    />
                </div>

                {/* F.I.O */}
                <div className="w-full flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#258385]">F.I.O (to‘liq ism sharif)</label>
                    <input
                        type="text"
                        value={fio}
                        onChange={(e) => setFio(e.target.value)}
                        placeholder="F.I.O (to‘liq ism sharif)"
                        className="border w-full focus:border-[#258385] px-4 py-4 rounded-md text-[#258385] outline-none"
                    />
                </div>
            </div>

            {/* Submit Button */}
            <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="mt-4 w-full px-6 py-4 bg-[#258385] text-white rounded-md font-semibold hover:bg-[#1f6c6d] transition disabled:opacity-50"
            >
                Yuborish
            </button>

            {/* Loader */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-10">
                    <div className="w-12 h-12 border-4 border-[#258385] border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    );
};
