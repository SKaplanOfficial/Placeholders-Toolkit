jest.mock(
  "@raycast/api",
  () => ({
    Alert: {
      ActionStyle: {
        Default: "DEFAULT",
        Cancel: "CANCEL",
        Destructive: "DESTRUCTIVE",
      },
    },
    environment: {
      raycastVersion: "1.0.0",
      extensionName: "",
      commandName: "command-name",
      commandMode: "view",
      assetsPath: "/foo/bar",
      supportPath: "/foo/bar/baz",
      isDevelopment: true,
      theme: "dark",
      textSize: "medium",
      launchType: "userInitiated",
      launchContext: {},
    },
    getPreferenceValues: jest.fn(
      () => ({})
    ),
    LocalStorage: {
      allItems: jest.fn(),
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    },
    Toast: {
      Style: {
        Success: "SUCCESS",
        Failure: "FAILURE",
        Animated: "ANIMATED",
      },
    },
    showToast: jest.fn(),
    Clipboard: {
      copy: jest.fn(),
      clear: jest.fn(),
      paste: jest.fn(),
      read: jest.fn(),
      readText: jest.fn(),
    },
    Cache: class MockCache {
      public allItems = jest.fn();
      public getItem = jest.fn();
      public setItem = jest.fn();
      public removeItem = jest.fn();
      public clear = jest.fn();
    },
    Color: {
      Blue: "raycast-blue",
      Green: "raycast-green",
      Magenta: "raycast-magenta",
      Orange: "raycast-orange",
      Purple: "raycast-purple",
      Red: "raycast-red",
      Yellow: "raycast-yellow",
      PrimaryText: "raycast-primary-text",
      SecondaryText: "raycast-secondary-text",
    },
    popToRoot: jest.fn(),
    closeMainWindow: jest.fn(),
    confirmAlert: jest.fn(),
    useNavigation: jest.fn(() => ({
      push: jest.fn(),
      pop: jest.fn(),
    })),
    showHUD: jest.fn(),
    Icon: {
      AddPerson: "add-person-16",
      Airplane: "airplane-16",
      AirplaneFilled: "airplane-filled-16",
      AirplaneLanding: "airplane-landing-16",
      AirplaneTakeoff: "airplane-takeoff-16",
      Airpods: "airpods-16",
      Alarm: "alarm-16",
      AlarmRinging: "alarm-ringing-16",
      AlignCentre: "align-centre-16",
      AlignLeft: "align-left-16",
      AlignRight: "align-right-16",
      AmericanFootball: "american-football-16",
      Anchor: "anchor-16",
      AppWindow: "app-window-16",
      AppWindowGrid2x2: "app-window-grid-2x2-16",
      AppWindowGrid3x3: "app-window-grid-3x3-16",
      AppWindowList: "app-window-list-16",
      AppWindowSidebarLeft: "app-window-sidebar-left-16",
      AppWindowSidebarRight: "app-window-sidebar-right-16",
      ArrowClockwise: "arrow-clockwise-16",
      ArrowCounterClockwise: "arrow-counter-clockwise-16",
      ArrowDown: "arrow-down-16",
      ArrowDownCircle: "arrow-down-circle-16",
      ArrowDownCircleFilled: "arrow-down-circle-filled-16",
      ArrowLeft: "arrow-left-16",
      ArrowLeftCircle: "arrow-left-circle-16",
      ArrowLeftCircleFilled: "arrow-left-circle-filled-16",
      ArrowNe: "arrow-ne-16",
      ArrowRight: "arrow-right-16",
      ArrowRightCircle: "arrow-right-circle-16",
      ArrowRightCircleFilled: "arrow-right-circle-filled-16",
      ArrowUp: "arrow-up-16",
      ArrowUpCircle: "arrow-up-circle-16",
      ArrowUpCircleFilled: "arrow-up-circle-filled-16",
      ArrowsContract: "arrows-contract-16",
      ArrowsExpand: "arrows-expand-16",
      AtSymbol: "at-symbol-16",
      BandAid: "band-aid-16",
      BankNote: "bank-note-16",
      BarChart: "bar-chart-16",
      BarCode: "bar-code-16",
      BathTub: "bath-tub-16",
      Battery: "battery-16",
      BatteryCharging: "battery-charging-16",
      BatteryDisabled: "battery-disabled-16",
      Bell: "bell-16",
      BellDisabled: "bell-disabled-16",
      Bike: "bike-16",
      Binoculars: "binoculars-16",
      Bird: "bird-16",
      BlankDocument: "blank-document-16",
      Bluetooth: "bluetooth-16",
      Boat: "boat-16",
      Bold: "bold-16",
      Bolt: "bolt-16",
      BoltDisabled: "bolt-disabled-16",
      Book: "book-16",
      Bookmark: "bookmark-16",
      Box: "box-16",
      Brush: "brush-16",
      Bubble: "speech-bubble-16",
      Bug: "bug-16",
      Building: "building-16",
      BulletPoints: "bullet-points-16",
      BullsEye: "bulls-eye-16",
      Buoy: "buoy-16",
      Calculator: "calculator-16",
      Calendar: "calendar-16",
      Camera: "camera-16",
      Car: "car-16",
      Cart: "cart-16",
      Cd: "cd-16",
      Center: "center-16",
      Check: "check-16",
      CheckCircle: "check-circle-16",
      CheckRosette: "check-rosette-16",
      Checkmark: "check-circle-16",
      ChessPiece: "chess-piece-16",
      ChevronDown: "chevron-down-16",
      ChevronDownSmall: "chevron-down-small-16",
      ChevronLeft: "chevron-left-16",
      ChevronLeftSmall: "chevron-left-small-16",
      ChevronRight: "chevron-right-16",
      ChevronRightSmall: "chevron-right-small-16",
      ChevronUp: "chevron-up-16",
      ChevronUpSmall: "chevron-up-small-16",
      Circle: "circle-16",
      CircleEllipsis: "circle-ellipsis-16",
      CircleFilled: "circle-filled-16",
      CircleProgress: "circle-progress-16",
      CircleProgress100: "circle-progress-100-16",
      CircleProgress25: "circle-progress-25-16",
      CircleProgress50: "circle-progress-50-16",
      CircleProgress75: "circle-progress-75-16",
      ClearFormatting: "clear-formatting-16",
      Clipboard: "copy-clipboard-16",
      Clock: "clock-16",
      Cloud: "cloud-16",
      CloudLightning: "cloud-lightning-16",
      CloudRain: "cloud-rain-16",
      CloudSnow: "cloud-snow-16",
      CloudSun: "cloud-sun-16",
      Code: "code-16",
      CodeBlock: "code-block-16",
      Cog: "cog-16",
      Coin: "coin-16",
      Coins: "coins-16",
      CommandSymbol: "command-symbol-16",
      Compass: "compass-16",
      ComputerChip: "computer-chip-16",
      Contrast: "contrast-16",
      CopyClipboard: "copy-clipboard-16",
      CreditCard: "credit-card-16",
      CricketBall: "cricket-ball-16",
      Crop: "crop-16",
      Crown: "crown-16",
      Crypto: "crypto-16",
      DeleteDocument: "delete-document-16",
      Desktop: "desktop-16",
      Dna: "dna-16",
      Document: "blank-document-16",
      Dot: "dot-16",
      Download: "download-16",
      EditShape: "edit-shape-16",
      Eject: "eject-16",
      Ellipsis: "ellipsis-16",
      Emoji: "emoji-16",
      Envelope: "envelope-16",
      Eraser: "eraser-16",
      ExclamationMark: "important-01-16",
      Exclamationmark: "exclamationmark-16",
      Exclamationmark2: "exclamationmark-2-16",
      Exclamationmark3: "exclamationmark-3-16",
      Eye: "eye-16",
      EyeDisabled: "eye-disabled-16",
      EyeDropper: "eye-dropper-16",
      Female: "female-16",
      FilmStrip: "film-strip-16",
      Filter: "filter-16",
      Finder: "finder-16",
      Fingerprint: "fingerprint-16",
      Flag: "flag-16",
      Folder: "folder-16",
      Footprints: "footprints-16",
      Forward: "forward-16",
      ForwardFilled: "forward-filled-16",
      FountainTip: "fountain-tip-16",
      FullSignal: "full-signal-16",
      GameController: "game-controller-16",
      Gauge: "gauge-16",
      Gear: "cog-16",
      Geopin: "geopin-16",
      Germ: "germ-16",
      Gift: "gift-16",
      Glasses: "glasses-16",
      Globe: "globe-01-16",
      Goal: "goal-16",
      Hammer: "hammer-16",
      HardDrive: "hard-drive-16",
      Hashtag: "hashtag-16",
      Headphones: "headphones-16",
      Heart: "heart-16",
      HeartDisabled: "heart-disabled-16",
      Heartbeat: "heartbeat-16",
      Highlight: "highlight-16",
      Hourglass: "hourglass-16",
      House: "house-16",
      Image: "image-16",
      Important: "important-01-16",
      Info: "info-01-16",
      Italics: "italics-16",
      Key: "key-16",
      Keyboard: "keyboard-16",
      Layers: "layers-16",
      Leaderboard: "leaderboard-16",
      Leaf: "leaf-16",
      LevelMeter: "signal-2-16",
      LightBulb: "light-bulb-16",
      LightBulbOff: "light-bulb-off-16",
      LineChart: "line-chart-16",
      Link: "link-16",
      List: "app-window-list-16",
      Livestream: "livestream-01-16",
      LivestreamDisabled: "livestream-disabled-01-16",
      Lock: "lock-16",
      LockDisabled: "lock-disabled-16",
      LockUnlocked: "lock-unlocked-16",
      Logout: "logout-16",
      Lorry: "lorry-16",
      Lowercase: "lowercase-16",
      MagnifyingGlass: "magnifying-glass-16",
      Male: "male-16",
      Map: "map-16",
      Mask: "mask-16",
      Maximize: "maximize-16",
      MedicalSupport: "medical-support-16",
      Megaphone: "megaphone-16",
      MemoryChip: "computer-chip-16",
      MemoryStick: "memory-stick-16",
      Message: "speech-bubble-16",
      Microphone: "microphone-16",
      MicrophoneDisabled: "microphone-disabled-16",
      Minimize: "minimize-16",
      Minus: "minus-16",
      MinusCircle: "minus-circle-16",
      MinusCircleFilled: "minus-circle-filled-16",
      Mobile: "mobile-16",
      Monitor: "monitor-16",
      Moon: "moon-16",
      Mountain: "mountain-16",
      Mouse: "mouse-16",
      Multiply: "multiply-16",
      Music: "music-16",
      Network: "network-16",
      NewDocument: "new-document-16",
      NewFolder: "new-folder-16",
      Number00: "number-00-16",
      Number01: "number-01-16",
      Number02: "number-02-16",
      Number03: "number-03-16",
      Number04: "number-04-16",
      Number05: "number-05-16",
      Number06: "number-06-16",
      Number07: "number-07-16",
      Number08: "number-08-16",
      Number09: "number-09-16",
      Number10: "number-10-16",
      Number11: "number-11-16",
      Number12: "number-12-16",
      Number13: "number-13-16",
      Number14: "number-14-16",
      Number15: "number-15-16",
      Number16: "number-16-16",
      Number17: "number-17-16",
      Number18: "number-18-16",
      Number19: "number-19-16",
      Number20: "number-20-16",
      Number21: "number-21-16",
      Number22: "number-22-16",
      Number23: "number-23-16",
      Number24: "number-24-16",
      Number25: "number-25-16",
      Number26: "number-26-16",
      Number27: "number-27-16",
      Number28: "number-28-16",
      Number29: "number-29-16",
      Number30: "number-30-16",
      Number31: "number-31-16",
      Number32: "number-32-16",
      Number33: "number-33-16",
      Number34: "number-34-16",
      Number35: "number-35-16",
      Number36: "number-36-16",
      Number37: "number-37-16",
      Number38: "number-38-16",
      Number39: "number-39-16",
      Number40: "number-40-16",
      Number41: "number-41-16",
      Number42: "number-42-16",
      Number43: "number-43-16",
      Number44: "number-44-16",
      Number45: "number-45-16",
      Number46: "number-46-16",
      Number47: "number-47-16",
      Number48: "number-48-16",
      Number49: "number-49-16",
      Number50: "number-50-16",
      Number51: "number-51-16",
      Number52: "number-52-16",
      Number53: "number-53-16",
      Number54: "number-54-16",
      Number55: "number-55-16",
      Number56: "number-56-16",
      Number57: "number-57-16",
      Number58: "number-58-16",
      Number59: "number-59-16",
      Number60: "number-60-16",
      Number61: "number-61-16",
      Number62: "number-62-16",
      Number63: "number-63-16",
      Number64: "number-64-16",
      Number65: "number-65-16",
      Number66: "number-66-16",
      Number67: "number-67-16",
      Number68: "number-68-16",
      Number69: "number-69-16",
      Number70: "number-70-16",
      Number71: "number-71-16",
      Number72: "number-72-16",
      Number73: "number-73-16",
      Number74: "number-74-16",
      Number75: "number-75-16",
      Number76: "number-76-16",
      Number77: "number-77-16",
      Number78: "number-78-16",
      Number79: "number-79-16",
      Number80: "number-80-16",
      Number81: "number-81-16",
      Number82: "number-82-16",
      Number83: "number-83-16",
      Number84: "number-84-16",
      Number85: "number-85-16",
      Number86: "number-86-16",
      Number87: "number-87-16",
      Number88: "number-88-16",
      Number89: "number-89-16",
      Number90: "number-90-16",
      Number91: "number-91-16",
      Number92: "number-92-16",
      Number93: "number-93-16",
      Number94: "number-94-16",
      Number95: "number-95-16",
      Number96: "number-96-16",
      Number97: "number-97-16",
      Number98: "number-98-16",
      Number99: "number-99-16",
      Paperclip: "paperclip-16",
      Paragraph: "paragraph-16",
      Patch: "patch-16",
      Pause: "pause-16",
      PauseFilled: "pause-filled-16",
      Pencil: "pencil-16",
      Person: "person-16",
      PersonCircle: "person-circle-16",
      PersonLines: "person-lines-16",
      Phone: "phone-16",
      PhoneRinging: "phone-ringing-16",
      PieChart: "pie-chart-16",
      Pill: "pill-16",
      Pin: "pin-16",
      PinDisabled: "pin-disabled-16",
      Play: "play-16",
      PlayFilled: "play-filled-16",
      Plug: "plug-16",
      Plus: "plus-16",
      PlusCircle: "plus-circle-16",
      PlusCircleFilled: "plus-circle-filled-16",
      PlusMinusDivideMultiply: "plus-minus-divide-multiply-16",
      PlusSquare: "plus-square-16",
      PlusTopRightSquare: "plus-top-right-square-16",
      Power: "power-16",
      Print: "print-16",
      QuestionMark: "question-mark-circle-16",
      QuestionMarkCircle: "question-mark-circle-16",
      QuotationMarks: "quotation-marks-16",
      QuoteBlock: "quote-block-16",
      Racket: "racket-16",
      Raindrop: "raindrop-16",
      RaycastLogoNeg: "raycast-logo-neg-16",
      RaycastLogoPos: "raycast-logo-pos-16",
      Receipt: "receipt-16",
      Redo: "redo-16",
      RemovePerson: "remove-person-16",
      Repeat: "repeat-16",
      Reply: "reply-16",
      Rewind: "rewind-16",
      RewindFilled: "rewind-filled-16",
      Rocket: "rocket-16",
      Rosette: "rosette-16",
      RotateAntiClockwise: "rotate-anti-clockwise-16",
      RotateClockwise: "rotate-clockwise-16",
      Ruler: "ruler-16",
      SaveDocument: "save-document-16",
      Shield: "shield-01-16",
      ShortParagraph: "short-paragraph-16",
      Shuffle: "shuffle-16",
      Sidebar: "app-window-sidebar-right-16",
      Signal1: "signal-1-16",
      Signal2: "signal-2-16",
      Signal3: "signal-3-16",
      Snippets: "snippets-16",
      Snowflake: "snowflake-16",
      SoccerBall: "soccer-ball-16",
      SpeakerDown: "speaker-down-16",
      SpeakerHigh: "speaker-high-16",
      SpeakerLow: "speaker-low-16",
      SpeakerOff: "speaker-off-16",
      SpeakerOn: "speaker-on-16",
      SpeakerUp: "speaker-up-16",
      SpeechBubble: "speech-bubble-16",
      SpeechBubbleActive: "speech-bubble-active-16",
      SpeechBubbleImportant: "speech-bubble-important-16",
      Star: "star-16",
      StarCircle: "star-circle-16",
      StarDisabled: "star-disabled-16",
      Stars: "stars-16",
      Stop: "stop-16",
      StopFilled: "stop-filled-16",
      Stopwatch: "stopwatch-16",
      Store: "store-16",
      StrikeThrough: "strike-through-16",
      Sun: "sun-16",
      Sunrise: "sunrise-16",
      Swatch: "swatch-16",
      Switch: "switch-16",
      Syringe: "syringe-16",
      Tag: "tag-16",
      Temperature: "temperature-16",
      TennisBall: "tennis-ball-16",
      Terminal: "terminal-16",
      Text: "text-16",
      TextCursor: "text-cursor-16",
      TextInput: "text-input-16",
      Torch: "torch-16",
      Train: "train-16",
      Trash: "trash-16",
      Tray: "tray-16",
      Tree: "tree-16",
      Trophy: "trophy-16",
      TwoPeople: "two-people-16",
      Umbrella: "umbrella-16",
      Underline: "underline-16",
      Undo: "undo-16",
      Upload: "upload-16",
      Uppercase: "uppercase-16",
      Video: "video-16",
      Wallet: "wallet-16",
      Wand: "wand-16",
      Warning: "warning-16",
      Weights: "weights-16",
      Wifi: "wifi-16",
      WifiDisabled: "wifi-disabled-16",
      Window: "app-window-16",
      WrenchScrewdriver: "wrench-screwdriver-16",
      WristWatch: "wrist-watch-16",
      XMarkCircle: "x-mark-circle-16",
      XMarkCircleFilled: "x-mark-circle-filled-16",
      XMarkTopRightSquare: "x-mark-top-right-square-16",
      TwoArrowsClockwise: "arrow-clockwise-16",
      EyeSlash: "eye-disabled-16",
      SpeakerArrowDown: "speaker-down-16",
      SpeakerArrowUp: "speaker-up-16",
      SpeakerSlash: "speaker-off-16",
      TextDocument: "blank-document-16",
      XmarkCircle: "x-mark-circle-16",
    },
  }),
  { virtual: true }
);

jest.mock(
  "react",
  () => ({
    useEffect: jest.fn((fn) => fn()),
    useRef: jest.fn((current) => ({ current })),
    useState: jest.fn((initial) => {
      let state = typeof initial === "function" ? initial() : initial;
      const setState = jest.fn((newState) => {
        state = typeof newState === "function" ? newState(state) : newState;
      });
      return [state, setState];
    }),
    useMemo: jest.fn((fn) => fn()),
    useReducer: jest.fn((reducer, initialState) => {
      let state = initialState;
      const dispatch = jest.fn((action) => {
        state = reducer(state, action);
      });
      return [state, dispatch];
    }),
    useCallback: jest.fn((fn) => fn),
  }),
  { virtual: true }
);