"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"

// Emoji categories
const categories = [
  { name: "Smileys & People", icon: "😀" },
  { name: "Animals & Nature", icon: "🐶" },
  { name: "Food & Drink", icon: "🍔" },
  { name: "Activities", icon: "⚽" },
  { name: "Travel & Places", icon: "🚗" },
  { name: "Objects", icon: "💡" },
  { name: "Symbols", icon: "❤️" },
  { name: "Flags", icon: "🏁" },
  { name: "PURPL Special", icon: "💜" },
]

// PURPL themed special emojis
const purplSpecialEmojis = [
  "💜",
  "🦄",
  "🐆",
  "🔮",
  "🦹",
  "👑",
  "💎",
  "🚀",
  "🌌",
  "✨",
  "🧙",
  "🔥",
  "🌟",
  "💫",
  "🌠",
  "🧿",
  "🦅",
  "🌈",
  "💰",
  "🪙",
]

// Emoji data by category
const emojiData = {
  "Smileys & People": [
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "🤣",
    "😂",
    "🙂",
    "🙃",
    "😉",
    "😊",
    "😇",
    "🥰",
    "😍",
    "🤩",
    "😘",
    "😗",
    "😚",
    "😙",
    "😋",
    "😛",
    "😜",
    "🤪",
    "😝",
    "🤑",
    "🤗",
    "🤭",
    "🤫",
    "🤔",
    "🤐",
    "🤨",
    "😐",
    "😑",
    "😶",
    "😏",
    "😒",
    "🙄",
    "😬",
    "🤥",
    "😌",
    "😔",
    "😪",
    "🤤",
    "😴",
    "😷",
    "🤒",
    "🤕",
    "🤢",
    "🤮",
    "🤧",
    "🥵",
    "🥶",
    "🥴",
    "😵",
    "🤯",
    "🤠",
    "🥳",
    "😎",
    "🤓",
    "👶",
    "👦",
    "👧",
    "👨",
    "👩",
    "👴",
    "👵",
    "👨‍⚕️",
    "👩‍⚕️",
    "👨‍🎓",
    "👩‍🎓",
    "👨‍🏫",
    "👩‍🏫",
    "👨‍⚖️",
    "👩‍⚖️",
    "👨‍🌾",
    "👩‍🌾",
    "👨‍🍳",
    "👩‍🍳",
    "👨‍🔧",
  ],
  "Animals & Nature": [
    "🐶",
    "🐱",
    "🐭",
    "🐹",
    "🐰",
    "🦊",
    "🐻",
    "🐼",
    "🐨",
    "🐯",
    "🦁",
    "🐮",
    "🐷",
    "🐽",
    "🐸",
    "🐵",
    "🙈",
    "🙉",
    "🙊",
    "🐒",
    "🐔",
    "🐧",
    "🐦",
    "🐤",
    "🐣",
    "🐥",
    "🦆",
    "🦅",
    "🦉",
    "🦇",
    "🐺",
    "🐗",
    "🐴",
    "🦄",
    "🐝",
    "🐛",
    "🦋",
    "🐌",
    "🐞",
    "🐜",
    "🦟",
    "🦗",
    "🕷",
    "🕸",
    "🦂",
    "🐢",
    "🐍",
    "🦎",
    "🦖",
    "🦕",
    "🐙",
    "🦑",
    "🦐",
    "🦞",
    "🦀",
    "🐡",
    "🐠",
    "🐟",
    "🐬",
    "🐳",
    "🐋",
    "🦈",
    "🐊",
    "🐅",
    "🐆",
    "🦓",
    "🦍",
    "🦧",
    "🐘",
    "🦛",
    "🦏",
    "🐪",
    "🐫",
    "🦒",
    "🦘",
    "🐃",
    "🐂",
    "🐄",
    "🐎",
    "🐖",
  ],
  "Food & Drink": [
    "🍏",
    "🍎",
    "🍐",
    "🍊",
    "🍋",
    "🍌",
    "🍉",
    "🍇",
    "🍓",
    "🍈",
    "🍒",
    "🍑",
    "🥭",
    "🍍",
    "🥥",
    "🥝",
    "🍅",
    "🍆",
    "🥑",
    "🥦",
    "🥬",
    "🥒",
    "🌶",
    "🌽",
    "🥕",
    "🧄",
    "🧅",
    "🥔",
    "🍠",
    "🥐",
    "🥯",
    "🍞",
    "🥖",
    "🥨",
    "🧀",
    "🥚",
    "🍳",
    "🧈",
    "🥞",
    "🧇",
    "🥓",
    "🥩",
    "🍗",
    "🍖",
    "🦴",
    "🌭",
    "🍔",
    "🍟",
    "🍕",
    "🥪",
    "🥙",
    "🧆",
    "🌮",
    "🌯",
    "🥗",
    "🥘",
    "🥫",
    "🍝",
    "🍜",
    "🍲",
    "🍛",
    "🍣",
    "🍱",
    "🥟",
    "🦪",
    "🍤",
    "🍙",
    "🍚",
    "🍘",
    "🍥",
    "🥠",
    "🥮",
    "🍢",
    "🍡",
    "🍧",
    "🍨",
    "🍦",
    "🥧",
    "🧁",
    "🍰",
  ],
  Activities: [
    "⚽",
    "🏀",
    "🏈",
    "⚾",
    "🥎",
    "🎾",
    "🏐",
    "🏉",
    "🥏",
    "🎱",
    "🪀",
    "🏓",
    "🏸",
    "🏒",
    "🏑",
    "🥍",
    "🏏",
    "🥅",
    "⛳",
    "🪁",
    "🏹",
    "🎣",
    "🤿",
    "🥊",
    "🥋",
    "🎽",
    "🛹",
    "🛷",
    "⛸",
    "🥌",
    "🎿",
    "⛷",
    "🏂",
    "🪂",
    "🏋️",
    "🤼",
    "🤸",
    "🤺",
    "⛹️",
    "🤾",
    "🏌️",
    "🏇",
    "🧘",
    "🏄",
    "🏊",
    "🤽",
    "🚣",
    "🧗",
    "🚵",
    "🚴",
    "🏆",
    "🥇",
    "🥈",
    "🥉",
    "🏅",
    "🎖",
    "🏵",
    "🎗",
    "🎫",
    "🎟",
    "🎪",
    "🤹",
    "🎭",
    "🎨",
    "🎬",
    "🎤",
    "🎧",
    "🎼",
    "🎹",
    "🥁",
    "🎷",
    "🎺",
    "🎸",
    "🪕",
    "🎻",
    "🎲",
    "♟",
    "🎯",
    "🎳",
    "🎮",
  ],
  "Travel & Places": [
    "🚗",
    "🚕",
    "🚙",
    "🚌",
    "🚎",
    "🏎",
    "🚓",
    "🚑",
    "🚒",
    "🚐",
    "🚚",
    "🚛",
    "🚜",
    "🦯",
    "🦽",
    "🦼",
    "🛴",
    "🚲",
    "🛵",
    "🏍",
    "🛺",
    "🚨",
    "🚔",
    "🚍",
    "🚘",
    "🚖",
    "🚡",
    "🚠",
    "🚟",
    "🚃",
    "🚋",
    "🚞",
    "🚝",
    "🚄",
    "🚅",
    "🚈",
    "🚂",
    "🚆",
    "🚇",
    "🚊",
    "🚉",
    "✈️",
    "🛫",
    "🛬",
    "🛩",
    "💺",
    "🛰",
    "🚀",
    "🛸",
    "🚁",
    "🛶",
    "⛵",
    "🚤",
    "🛥",
    "🛳",
    "⛴",
    "🚢",
    "⚓",
    "⛽",
    "🚧",
    "🚦",
    "🚥",
    "🚏",
    "🗺",
    "🗿",
    "🗽",
    "🗼",
    "🏰",
    "🏯",
    "🏟",
    "🎡",
    "🎢",
    "🎠",
    "⛲",
    "⛱",
    "🏖",
    "🏝",
    "🏜",
    "🌋",
    "⛰",
  ],
  Objects: [
    "💡",
    "🔦",
    "🕯",
    "🧯",
    "🛢",
    "💸",
    "💵",
    "💴",
    "💶",
    "💷",
    "💰",
    "💳",
    "💎",
    "⚖️",
    "🧰",
    "🔧",
    "🔨",
    "⚒",
    "🛠",
    "⛏",
    "🔩",
    "⚙️",
    "🧱",
    "⛓",
    "🧲",
    "🔫",
    "💣",
    "🧨",
    "🪓",
    "🔪",
    "🗡",
    "⚔️",
    "🛡",
    "🚬",
    "⚰️",
    "⚱️",
    "🏺",
    "🔮",
    "📿",
    "🧿",
    "💈",
    "⚗️",
    "🔭",
    "🔬",
    "🕳",
    "🩹",
    "🩺",
    "💊",
    "💉",
    "🩸",
    "🧬",
    "🦠",
    "🧫",
    "🧪",
    "🌡",
    "🧹",
    "🧺",
    "🧻",
    "🚽",
    "🚰",
    "🚿",
    "🛁",
    "🛀",
    "🧼",
    "🪒",
    "🧽",
    "🧴",
    "🛎",
    "🔑",
    "🗝",
    "🚪",
    "🪑",
    "🛋",
    "🛏",
    "🛌",
    "🧸",
    "🖼",
    "🛍",
    "🛒",
    "🎁",
  ],
  Symbols: [
    "❤️",
    "🧡",
    "💛",
    "💚",
    "💙",
    "💜",
    "🖤",
    "🤍",
    "🤎",
    "💔",
    "❣️",
    "💕",
    "💞",
    "💓",
    "💗",
    "💖",
    "💘",
    "💝",
    "💟",
    "☮️",
    "✝️",
    "☪️",
    "🕉",
    "☸️",
    "✡️",
    "🔯",
    "🕎",
    "☯️",
    "☦️",
    "🛐",
    "⛎",
    "♈",
    "♉",
    "♊",
    "♋",
    "♌",
    "♍",
    "♎",
    "♏",
    "♐",
    "♑",
    "♒",
    "♓",
    "🆔",
    "⚛️",
    "🉑",
    "☢️",
    "☣️",
    "📴",
    "📳",
    "🈶",
    "🈚",
    "🈸",
    "🈺",
    "🈷️",
    "✴️",
    "🆚",
    "💮",
    "🉐",
    "㊙️",
    "㊗️",
    "🈴",
    "🈵",
    "🈹",
    "🈲",
    "🅰️",
    "🅱️",
    "🆎",
    "🆑",
    "🅾️",
    "🆘",
    "❌",
    "⭕",
    "🛑",
    "⛔",
    "📛",
    "🚫",
    "💯",
    "💢",
    "♨️",
  ],
  Flags: [
    "🏁",
    "🚩",
    "🎌",
    "🏴",
    "🏳️",
    "🏳️‍🌈",
    "🏴‍☠️",
    "🇦🇨",
    "🇦🇩",
    "🇦🇪",
    "🇦🇫",
    "🇦🇬",
    "🇦🇮",
    "🇦🇱",
    "🇦🇲",
    "🇦🇴",
    "🇦🇶",
    "🇦🇷",
    "🇦🇸",
    "🇦🇹",
    "🇦🇺",
    "🇦🇼",
    "🇦🇽",
    "🇦🇿",
    "🇧🇦",
    "🇧🇧",
    "🇧🇩",
    "🇧🇪",
    "🇧🇫",
    "🇧🇬",
    "🇧🇭",
    "🇧🇮",
    "🇧🇯",
    "🇧🇱",
    "🇧🇲",
    "🇧🇳",
    "🇧🇴",
    "🇧🇶",
    "🇧🇷",
    "🇧🇸",
    "🇧🇹",
    "🇧🇻",
    "🇧🇼",
    "🇧🇾",
    "🇧🇿",
    "🇨🇦",
    "🇨🇨",
    "🇨🇩",
    "🇨🇫",
    "🇨🇬",
    "🇨🇭",
    "🇨🇮",
    "🇨🇰",
    "🇨🇱",
    "🇨🇲",
    "🇨🇳",
    "🇨🇴",
    "🇨🇵",
    "🇨🇷",
    "🇨🇺",
    "🇨🇻",
    "🇨🇼",
    "🇨🇽",
    "🇨🇾",
    "🇨🇿",
    "🇩🇪",
    "🇩🇬",
    "🇩🇯",
    "🇩🇰",
    "🇩🇲",
    "🇩🇴",
    "🇩🇿",
    "🇪🇦",
    "🇪🇨",
    "🇪🇪",
    "🇪🇬",
  ],
  "PURPL Special": purplSpecialEmojis,
}

// Recently used emojis
const initialRecentEmojis = ["💜", "🦄", "🐆", "🔮", "🚀", "✨", "💎", "🌌", "🔥", "🌟"]

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void
  onClose?: () => void
}

export default function EmojiPicker({ onEmojiSelect, onClose }: EmojiPickerProps) {
  const [selectedCategory, setSelectedCategory] = useState("PURPL Special")
  const [searchTerm, setSearchTerm] = useState("")
  const [recentEmojis, setRecentEmojis] = useState<string[]>(initialRecentEmojis)
  const [filteredEmojis, setFilteredEmojis] = useState<string[]>([])

  // Load recent emojis from localStorage if available
  useEffect(() => {
    const savedRecents = localStorage.getItem("purpl-recent-emojis")
    if (savedRecents) {
      try {
        setRecentEmojis(JSON.parse(savedRecents))
      } catch (e) {
        console.error("Failed to parse recent emojis", e)
      }
    }
  }, [])

  // Filter emojis based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredEmojis([])
      return
    }

    const results: string[] = []
    Object.values(emojiData).forEach((categoryEmojis) => {
      categoryEmojis.forEach((emoji) => {
        if (results.length < 50) {
          results.push(emoji)
        }
      })
    })

    setFilteredEmojis(results)
  }, [searchTerm])

  // Handle emoji selection
  const handleEmojiSelect = (emoji: string) => {
    // Add to recent emojis
    const newRecents = [emoji, ...recentEmojis.filter((e) => e !== emoji)].slice(0, 20)
    setRecentEmojis(newRecents)

    // Save to localStorage
    try {
      localStorage.setItem("purpl-recent-emojis", JSON.stringify(newRecents))
    } catch (e) {
      console.error("Failed to save recent emojis", e)
    }

    // Call the callback
    onEmojiSelect(emoji)
  }

  return (
    <div className="bg-cosmic-dark/90 backdrop-blur-md rounded-lg border border-purpl p-4 w-full max-w-md max-h-[500px] overflow-hidden flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold text-purpl-light">Emoji Picker</h3>
        {onClose && (
          <button onClick={onClose} className="p-1 hover:bg-purpl/30 rounded-full">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Search bar */}
      <div className="relative mb-3">
        <input
          type="text"
          placeholder="Search emojis..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-cosmic-dark/50 border border-purpl rounded-lg px-3 py-2 pl-9 text-white"
        />
        <Search className="absolute left-2 top-2.5 text-purpl-light" size={18} />
      </div>

      {/* Recent emojis */}
      {!searchTerm && (
        <div className="mb-3">
          <h4 className="text-sm text-purpl-light mb-1">Recently Used</h4>
          <div className="flex flex-wrap gap-1">
            {recentEmojis.map((emoji, index) => (
              <button
                key={`recent-${index}`}
                onClick={() => handleEmojiSelect(emoji)}
                className="w-8 h-8 flex items-center justify-center hover:bg-purpl/20 rounded text-xl"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Category tabs */}
      {!searchTerm && (
        <div className="flex overflow-x-auto mb-3 pb-1 scrollbar-thin scrollbar-thumb-purpl scrollbar-track-cosmic-dark">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`flex items-center px-3 py-1 mr-1 rounded-full whitespace-nowrap ${
                selectedCategory === category.name
                  ? "bg-purpl text-white"
                  : "bg-cosmic-dark/50 text-white/80 hover:bg-purpl/30"
              }`}
            >
              <span className="mr-1">{category.icon}</span>
              <span className="text-xs">{category.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Emoji grid */}
      <div className="flex-1 overflow-y-auto pr-1">
        <div className="grid grid-cols-8 gap-1">
          {searchTerm
            ? filteredEmojis.map((emoji, index) => (
                <button
                  key={`search-${index}`}
                  onClick={() => handleEmojiSelect(emoji)}
                  className="w-8 h-8 flex items-center justify-center hover:bg-purpl/20 rounded text-xl"
                >
                  {emoji}
                </button>
              ))
            : emojiData[selectedCategory as keyof typeof emojiData].map((emoji, index) => (
                <button
                  key={`${selectedCategory}-${index}`}
                  onClick={() => handleEmojiSelect(emoji)}
                  className="w-8 h-8 flex items-center justify-center hover:bg-purpl/20 rounded text-xl"
                >
                  {emoji}
                </button>
              ))}
        </div>
      </div>
    </div>
  )
}
