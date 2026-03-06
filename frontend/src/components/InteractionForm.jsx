import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateField } from '../redux/store';
import { Search, Mic, Plus, FileText, Package, Smile, Meh, Frown, ChevronDown, Sparkles } from 'lucide-react';

const InteractionForm = () => {
  const formData = useSelector((state) => state.interaction.formData);
  const dispatch = useDispatch();

  const handleSentimentChange = (value) => {
    // Only allow changes via dispatch if you want to lock manual interaction
    // However, to satisfy the requirement of "no manual edit", we can keep it disabled
    // or just remove the local change handlers entirely for manual inputs.
  };

  return (
    <div className="card custom-scrollbar">
      <div className="row-between border-b pb-4 mb-6">
        <h3 className="section-title mb-0">Interaction Details</h3>
        <div className="ai-badge">
          <Sparkles size={14} /> ✨ AI Auto-fill Active
        </div>
      </div>

      <div className="space-y-6">
        {/* HCP Name & Interaction Type */}
        <div className="form-row">
          <div className="input-group">
            <label>HCP Name</label>
            <input
              type="text"
              name="hcp_name"
              value={formData.hcp_name}
              readOnly
              className="bg-slate-50 cursor-not-allowed"
              placeholder="Waiting for AI extraction..."
            />
          </div>
          <div className="input-group">
            <label>Interaction Type</label>
            <div className="relative">
              <select
                name="interaction_type"
                value={formData.interaction_type}
                disabled
                className="bg-slate-50 cursor-not-allowed appearance-none"
              >
                <option>Meeting</option>
                <option>Call</option>
                <option>Email</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Date & Time */}
        <div className="form-row">
          <div className="input-group">
            <div className="flex items-center">
              <label>Date</label>
              {formData.date && (
                <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded ml-2 border border-green-100 animate-pulse">
                  ✨ AI updated
                </span>
              )}
            </div>
            <input
              type="text"
              name="date"
              value={formData.date}
              readOnly
              className="bg-slate-50 cursor-not-allowed"
              placeholder="dd/mm/yyyy"
            />
          </div>
          <div className="input-group">
            <label>Time</label>
            <input
              type="text"
              name="time"
              value={formData.time}
              readOnly
              className="bg-slate-50 cursor-not-allowed"
              placeholder="--:--"
            />
          </div>
        </div>

        {/* Attendees */}
        <div className="input-group">
          <div className="flex items-center">
            <label>Attendees</label>
            {formData.attendees && formData.attendees.length > 0 && (
              <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded ml-2 border border-green-100 animate-pulse">
                ✨ AI updated
              </span>
            )}
          </div>
          <input
            type="text"
            value={formData.attendees ? formData.attendees.join(', ') : ''}
            readOnly
            className="bg-slate-50 cursor-not-allowed"
            placeholder="Names will be extracted by AI..."
          />
        </div>

        {/* Topics Discussed */}
        <div className="input-group">
          <div className="flex items-center">
            <label>Topics Discussed</label>
            {formData.topics_discussed && (
              <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded ml-2 border border-green-100 animate-pulse">
                ✨ AI updated
              </span>
            )}
          </div>
          <div className="relative">
            <textarea
              name="topics_discussed"
              value={formData.topics_discussed}
              readOnly
              className="bg-slate-50 cursor-not-allowed"
              placeholder="Discussion points will appear here..."
            ></textarea>
            <Mic size={18} className="absolute bottom-3 right-3 text-slate-300 pointer-events-none" />
          </div>
        </div>

        {/* Materials Shared */}
        <div className="pt-4 border-t">
          <div className="row-between mb-3">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <FileText size={18} className="text-blue-500" /> Materials Shared
              {formData.materials_shared && formData.materials_shared.length > 0 && (
                <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded ml-2 border border-green-100 animate-pulse">
                  ✨ AI updated
                </span>
              )}
            </div>
            <button className="action-btn flex items-center gap-1.5">
              <Search size={14} /> Search/Add
            </button>
          </div>
          <div className="ml-7 space-y-1">
            {formData.materials_shared && formData.materials_shared.length > 0 ? (
              formData.materials_shared.map((item, i) => (
                <div key={i} className="text-xs text-slate-600 font-medium flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                  {item}
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic font-medium">No materials added.</p>
            )}
          </div>
        </div>

        {/* Samples Distributed */}
        <div className="pt-4 border-t">
          <div className="row-between mb-3">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <Package size={18} className="text-orange-500" /> Samples Distributed
              {formData.samples_distributed && formData.samples_distributed.length > 0 && (
                <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded ml-2 border border-green-100 animate-pulse">
                  ✨ AI updated
                </span>
              )}
            </div>
            <button className="action-btn flex items-center gap-1.5">
              <Plus size={14} /> Add Sample
            </button>
          </div>
          <div className="ml-7 space-y-1">
            {formData.samples_distributed && formData.samples_distributed.length > 0 ? (
              formData.samples_distributed.map((item, i) => (
                <div key={i} className="text-xs text-slate-600 font-medium flex items-center gap-2">
                  <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
                  {item}
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic font-medium">No samples added.</p>
            )}
          </div>
        </div>

        {/* Sentiment Section */}
        <div className="pt-4 border-t">
          <div className="flex items-center">
            <label className="block text-sm font-semibold text-slate-700">Observed/Inferred HCP Sentiment</label>
            {formData.sentiment && (
              <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded ml-2 border border-green-100">
                ✨ AI updated
              </span>
            )}
          </div>
          <div className="sentiment-container opacity-70 pointer-events-none">
            {[
              { label: 'Positive', val: 'Positive', icon: Smile, color: 'text-green-500' },
              { label: 'Neutral', val: 'Neutral', icon: Meh, color: 'text-blue-500' },
              { label: 'Negative', val: 'Negative', icon: Frown, color: 'text-red-500' }
            ].map((s) => (
              <label key={s.val} className="flex items-center gap-2 cursor-not-allowed group">
                <input
                  type="radio"
                  name="sentiment"
                  checked={formData.sentiment === s.val}
                  readOnly
                  className="w-4 h-4 text-blue-600 border-slate-300"
                />
                <div className="flex items-center gap-1.5">
                  <s.icon size={18} className={`${s.color} opacity-80`} />
                  <span className="text-sm font-medium text-slate-600">{s.label}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Outcomes & Follow-up */}
        <div className="form-row">
          <div className="input-group">
            <div className="flex items-center">
              <label>Outcomes</label>
              {formData.outcome && (
                <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded ml-2 border border-green-100 animate-pulse">
                  ✨ AI updated
                </span>
              )}
            </div>
            <textarea
              name="outcome"
              value={formData.outcome}
              readOnly
              placeholder="AI will extract outcomes..."
              className="h-[70px] bg-slate-50 cursor-not-allowed"
            ></textarea>
          </div>
          <div className="input-group">
            <div className="flex items-center">
              <label>Follow-up Actions</label>
              {formData.follow_up && (
                <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded ml-2 border border-green-100 animate-pulse">
                  ✨ AI updated
                </span>
              )}
            </div>
            <textarea
              name="follow_up"
              value={formData.follow_up}
              readOnly
              placeholder="AI will extract follow-ups..."
              className="h-[70px] bg-slate-50 cursor-not-allowed"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractionForm;
