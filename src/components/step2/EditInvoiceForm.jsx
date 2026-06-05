import React, { useState } from 'react';

const InputField = ({ label, name, type = 'text', required, placeholder, value, onChange }) => (
    <div className="mb-6">
        <label className="block text-[13px] font-semibold text-[#6e6e73] tracking-wide mb-2 uppercase">
            {label} {required && <span className="text-[#ff3b30]">*</span>}
        </label>
        <input
            type={type}
            name={name}
            value={value || ''}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-[#fbfbfd] border border-[#d2d2d7] rounded-xl px-4 py-3.5 text-sm text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#4f86f7]/40 focus:border-[#4f86f7] transition-all duration-200 shadow-sm"
        />
    </div>
);

export default function EditInvoiceForm({ data, parsedState, onChange, onContinue, onBack }) {
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        onChange(prev => ({ ...prev, [name]: value }));
        if (name === 'businessName' && value.trim() !== '') {
            setError('');
        }
    };

    const handleContinue = () => {
        const bName = (data.businessName || "").trim();
        if (bName.length < 3) {
            setError('Business Name must be at least 3 characters');
            return;
        }

        const cleanedData = {
            ...data,
            businessName: bName,
            sellerAccountName: (data.sellerAccountName || "").trim()
        };

        onChange(cleanedData);
        onContinue();
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#e5e5ea] overflow-hidden mb-8">
                <div className="px-10 py-8 border-b border-[#e5e5ea] bg-white">
                    <h2 className="text-xl font-semibold text-[#1d1d1f] tracking-tight">Edit Invoice Details</h2>
                    <p className="text-sm text-[#6e6e73] mt-1">Provide your business and invoice information for the generated claim.</p>
                </div>

                <div className="p-10">
                    {/* Takealot Billing Details */}
                    <div className="mb-12 border border-[#e5e5ea] rounded-3xl overflow-hidden bg-white shadow-sm">
                        <div className="flex items-center justify-between px-8 py-5 border-b border-[#e5e5ea]">
                            <h3 className="text-[15px] font-semibold text-[#4f86f7]">Takealot Billing Details</h3>
                            <span className="text-[12px] font-bold text-[#4f86f7] uppercase tracking-wider">Recipient</span>
                        </div>
                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            <div>
                                <label className="block text-[13px] font-semibold text-[#6e6e73] tracking-wide mb-2 uppercase">Takealot VAT Number</label>
                                <div className="w-full bg-[#fbfbfd] border border-[#d2d2d7] rounded-xl px-4 py-3.5 text-sm text-[#1d1d1f] shadow-sm select-all">
                                    4470208333
                                </div>
                            </div>
                            <div>
                                <label className="block text-[13px] font-semibold text-[#6e6e73] tracking-wide mb-2 uppercase">Takealot Registration Number</label>
                                <div className="w-full bg-[#fbfbfd] border border-[#d2d2d7] rounded-xl px-4 py-3.5 text-sm text-[#1d1d1f] shadow-sm select-all">
                                    2010/020248/07
                                </div>
                            </div>
                            <div>
                                <label className="block text-[13px] font-semibold text-[#6e6e73] tracking-wide mb-2 uppercase">Takealot Tax Reference Number</label>
                                <div className="w-full bg-[#fbfbfd] border border-[#d2d2d7] rounded-xl px-4 py-3.5 text-sm text-[#1d1d1f] shadow-sm select-all">
                                    9910006148
                                </div>
                            </div>
                            <div>
                                <label className="block text-[13px] font-semibold text-[#6e6e73] tracking-wide mb-2 uppercase">Takealot Physical Address</label>
                                <div className="w-full bg-[#fbfbfd] border border-[#d2d2d7] rounded-xl px-4 py-3.5 text-sm text-[#1d1d1f] shadow-sm select-all whitespace-nowrap overflow-hidden text-ellipsis">
                                    12th Floor, 10 Rua Vasco Da Gama Plain, Foreshore, Cape Town
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section A: Business Details */}
                    <div className="mb-12">
                        <h3 className="text-[15px] font-semibold text-[#1d1d1f] mb-6 border-b border-[#e5e5ea] pb-2">Business Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                            <InputField label="Business Name" name="businessName" required placeholder="Enter registered business name" value={data.businessName} onChange={handleInputChange} />
                            <InputField label="Registration Number" name="registrationNumber" placeholder="Optional" value={data.registrationNumber} onChange={handleInputChange} />

                            <InputField label="Seller Account Name" name="sellerAccountName" placeholder="Enter your Takealot seller account name" value={data.sellerAccountName} onChange={handleInputChange} />
                            <InputField label="Seller ID (optional)" name="sellerId" placeholder="Optional" value={data.sellerId} onChange={handleInputChange} />

                            <div className="mb-6">
                                <label className="block text-[13px] font-semibold text-[#6e6e73] tracking-wide mb-2 uppercase">VAT Status</label>
                                <div className="flex space-x-6 mt-3">
                                    <label className="flex items-center space-x-3 cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="vatStatus"
                                            value="VAT Registered"
                                            checked={data.vatStatus === 'VAT Registered'}
                                            onChange={handleInputChange}
                                            className="w-5 h-5 text-[#4f86f7] border-[#d2d2d7] focus:ring-[#4f86f7] transition-all cursor-pointer"
                                        />
                                        <span className="text-sm font-medium text-[#1d1d1f] group-hover:text-[#4f86f7] transition-colors">VAT Registered</span>
                                    </label>
                                    <label className="flex items-center space-x-3 cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="vatStatus"
                                            value="Not VAT Registered"
                                            checked={data.vatStatus === 'Not VAT Registered'}
                                            onChange={handleInputChange}
                                            className="w-5 h-5 text-[#4f86f7] border-[#d2d2d7] focus:ring-[#4f86f7] transition-all cursor-pointer"
                                        />
                                        <span className="text-sm font-medium text-[#1d1d1f] group-hover:text-[#4f86f7] transition-colors">Not VAT Registered</span>
                                    </label>
                                </div>
                            </div>

                            {data.vatStatus === 'VAT Registered' && (
                                <InputField label="Tax Reference / VAT Number" name="taxReferenceNumber" placeholder="Optional" value={data.taxReferenceNumber} onChange={handleInputChange} />
                            )}
                        </div>
                    </div>

                    {/* Section B: Invoice Details */}
                    <div className="mb-12">
                        <h3 className="text-[15px] font-semibold text-[#1d1d1f] mb-6 border-b border-[#e5e5ea] pb-2">Invoice Configuration</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                            <InputField label="Invoice Number" name="invoiceNumber" placeholder="e.g. INV-20231015-123" value={data.invoiceNumber} onChange={handleInputChange} />
                            <InputField label="Invoice Date" name="invoiceDate" type="date" value={data.invoiceDate} onChange={handleInputChange} />
                        </div>
                    </div>

                    {/* Section C: Company Address */}
                    <div className="mb-12">
                        <h3 className="text-[15px] font-semibold text-[#1d1d1f] mb-6 border-b border-[#e5e5ea] pb-2">Registered Address</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                            <InputField label="Street Address" name="street" value={data.street} onChange={handleInputChange} placeholder="123 Main Street" />
                            <InputField label="City" name="city" value={data.city} onChange={handleInputChange} placeholder="Cape Town" />
                            <InputField label="Province / State" name="province" value={data.province} onChange={handleInputChange} placeholder="Western Cape" />
                            <div className="grid grid-cols-2 gap-4">
                                <InputField label="Postal Code" name="postalCode" value={data.postalCode} onChange={handleInputChange} placeholder="8001" />
                                <InputField label="Country" name="country" value={data.country} onChange={handleInputChange} placeholder="South Africa" />
                            </div>
                        </div>
                    </div>

                    {parsedState && parsedState.data && parsedState.matchedColumns && (
                        <div className="mb-12">
                            <h3 className="text-[15px] font-semibold text-[#1d1d1f] mb-6 border-b border-[#e5e5ea] pb-2">Line Items & Financial Totals</h3>

                            <div className="mb-8 border border-[#e5e5ea] rounded-2xl overflow-hidden bg-white p-8 shadow-sm">
                                <h4 className="text-[13px] font-bold text-[#1d1d1f] uppercase tracking-wider mb-6">Line Items</h4>
                                <div className="space-y-4">
                                    {parsedState.data.filter(r => r._numericClaim > 0).map((item, idx) => {
                                        const override = data.lineItemOverrides && data.lineItemOverrides[idx] ? data.lineItemOverrides[idx] : null;
                                        const qty = override && override.qty !== undefined ? override.qty : 1;
                                        const rate = override && override.rate !== undefined ? override.rate : (item._numericClaim || 0);

                                        return (
                                            <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between border border-[#e5e5ea] rounded-xl p-5 bg-white relative hover:border-[#d2d2d7] transition-colors">
                                                <div className="flex-1 mb-4 md:mb-0 md:mr-6">
                                                    <h5 className="text-[14px] font-bold text-[#1d1d1f] mb-1">{parsedState.matchedColumns.productTitle ? item[parsedState.matchedColumns.productTitle] : 'Unknown Product'}</h5>
                                                    <p className="text-[11px] text-[#6e6e73] font-medium uppercase tracking-tight">
                                                        TSIN: {parsedState.matchedColumns.tsin ? item[parsedState.matchedColumns.tsin] : 'N/A'} • SKU: {parsedState.matchedColumns.sku ? item[parsedState.matchedColumns.sku] : 'N/A'}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div>
                                                        <label className="block text-[11px] font-bold text-[#6e6e73] uppercase tracking-wider mb-1.5">Qty</label>
                                                        <div className="flex items-center border border-[#d2d2d7] rounded-xl overflow-hidden bg-[#fbfbfd]">
                                                            <input
                                                                type="number"
                                                                className="w-16 px-3 py-2 text-sm font-semibold text-[#1d1d1f] focus:outline-none text-center bg-transparent"
                                                                value={qty}
                                                                onChange={(e) => {
                                                                    const val = e.target.value;
                                                                    onChange(prev => {
                                                                        const overrides = { ...prev.lineItemOverrides };
                                                                        overrides[idx] = { ...(overrides[idx] || {}), qty: val };
                                                                        return { ...prev, lineItemOverrides: overrides };
                                                                    });
                                                                }}
                                                            />
                                                            <div className="flex flex-col border-l border-[#d2d2d7] bg-[#f5f5f7]">
                                                                <button onClick={() => {
                                                                    onChange(prev => {
                                                                        const val = Number(qty) + 1;
                                                                        const overrides = { ...prev.lineItemOverrides };
                                                                        overrides[idx] = { ...(overrides[idx] || {}), qty: val };
                                                                        return { ...prev, lineItemOverrides: overrides };
                                                                    });
                                                                }} className="px-2 py-0.5 hover:bg-[#e5e5ea] border-b border-[#d2d2d7] text-[#6e6e73]">
                                                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>
                                                                </button>
                                                                <button onClick={() => {
                                                                    onChange(prev => {
                                                                        const val = Math.max(0, Number(qty) - 1);
                                                                        const overrides = { ...prev.lineItemOverrides };
                                                                        overrides[idx] = { ...(overrides[idx] || {}), qty: val };
                                                                        return { ...prev, lineItemOverrides: overrides };
                                                                    });
                                                                }} className="px-2 py-0.5 hover:bg-[#e5e5ea] text-[#6e6e73]">
                                                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block text-[11px] font-bold text-[#6e6e73] uppercase tracking-wider mb-1.5">Unit Rate</label>
                                                        <div className="flex items-center border border-[#d2d2d7] rounded-xl overflow-hidden bg-[#fbfbfd]">
                                                            <input
                                                                type="number"
                                                                step="0.01"
                                                                className="w-24 px-3 py-2 text-sm font-semibold text-[#1d1d1f] focus:outline-none bg-transparent"
                                                                value={rate}
                                                                onChange={(e) => {
                                                                    const val = e.target.value;
                                                                    onChange(prev => {
                                                                        const overrides = { ...prev.lineItemOverrides };
                                                                        overrides[idx] = { ...(overrides[idx] || {}), rate: val };
                                                                        return { ...prev, lineItemOverrides: overrides };
                                                                    });
                                                                }}
                                                            />
                                                            <div className="flex flex-col border-l border-[#d2d2d7] bg-[#f5f5f7]">
                                                                <button onClick={() => {
                                                                    onChange(prev => {
                                                                        const val = (Number(rate) + 0.1).toFixed(2);
                                                                        const overrides = { ...prev.lineItemOverrides };
                                                                        overrides[idx] = { ...(overrides[idx] || {}), rate: val };
                                                                        return { ...prev, lineItemOverrides: overrides };
                                                                    });
                                                                }} className="px-2 py-0.5 hover:bg-[#e5e5ea] border-b border-[#d2d2d7] text-[#6e6e73]">
                                                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>
                                                                </button>
                                                                <button onClick={() => {
                                                                    onChange(prev => {
                                                                        const val = Math.max(0, Number(rate) - 0.1).toFixed(2);
                                                                        const overrides = { ...prev.lineItemOverrides };
                                                                        overrides[idx] = { ...(overrides[idx] || {}), rate: val };
                                                                        return { ...prev, lineItemOverrides: overrides };
                                                                    });
                                                                }} className="px-2 py-0.5 hover:bg-[#e5e5ea] text-[#6e6e73]">
                                                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-[13px] font-bold text-[#6e6e73] tracking-wider mb-2 uppercase">Custom Subtotal Override</label>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="0.01"
                                            name="subtotalOverride"
                                            placeholder="e.g. 7066.64"
                                            value={data.subtotalOverride || ''}
                                            onChange={handleInputChange}
                                            className="w-full sm:w-[300px] bg-[#fbfbfd] border-2 border-[#4f86f7]/60 rounded-xl px-4 py-3.5 pr-10 text-sm font-semibold text-[#1d1d1f] shadow-sm focus:outline-none focus:ring-0 focus:border-[#4f86f7]"
                                        />
                                        <div className="absolute right-2 top-0 bottom-0 flex flex-col justify-center gap-0.5 px-1 pb-0.5">
                                            <button onClick={() => {
                                                const current = Number(data.subtotalOverride || 0);
                                                onChange(prev => ({ ...prev, subtotalOverride: (current + 1).toFixed(2) }));
                                            }} className="text-[#6e6e73] hover:text-[#1d1d1f]">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>
                                            </button>
                                            <button onClick={() => {
                                                const current = Number(data.subtotalOverride || 0);
                                                onChange(prev => ({ ...prev, subtotalOverride: Math.max(0, current - 1).toFixed(2) }));
                                            }} className="text-[#6e6e73] hover:text-[#1d1d1f]">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-[12px] text-[#6e6e73] flex-1 tracking-tight">
                                        Leave blank to use the automatically calculated subtotal from the line items above.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Section D: Notes */}
                    <div>
                        <h3 className="text-[15px] font-semibold text-[#1d1d1f] mb-6 border-b border-[#e5e5ea] pb-2">Additional Details</h3>
                        <label className="block text-[13px] font-semibold text-[#6e6e73] tracking-wide mb-2 uppercase">Custom Notes</label>
                        <textarea
                            name="notes"
                            value={data.notes || ''}
                            onChange={handleInputChange}
                            rows={4}
                            placeholder="Additional notes (optional)"
                            className="w-full bg-[#fbfbfd] border border-[#d2d2d7] rounded-xl px-4 py-3.5 text-sm text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#4f86f7]/40 focus:border-[#4f86f7] transition-all duration-200 shadow-sm resize-y"
                        />
                    </div>

                    {error && (
                        <div className="mt-8 p-4 bg-[#fff5f5] border border-[#ffcccc] rounded-xl text-center">
                            <p className="text-sm font-semibold text-[#ff3b30]">{error}</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center justify-between pb-10">
                <button
                    onClick={onBack}
                    className="bg-white hover:bg-[#f5f5f7] text-[#1d1d1f] border border-[#d2d2d7] font-medium py-3.5 px-8 rounded-full transition-all duration-300 shadow-sm active:scale-95"
                >
                    Back to Upload
                </button>
                <button
                    onClick={handleContinue}
                    className="bg-[#4f86f7] hover:bg-[#3b6bd6] text-white font-medium py-3.5 px-10 rounded-full shadow-[0_4px_16px_rgba(79,134,247,0.3)] transition-all duration-300 active:scale-95"
                >
                    Continue to Preview
                </button>
            </div>
        </div>
    );
}
