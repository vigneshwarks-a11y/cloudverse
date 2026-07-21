/* Deep-import shim for @solar-icons/react.
   The package's top-level barrel (dist/esm/index.mjs) statically imports
   ALL ~1400 icons in one file, so `import { X } from "@solar-icons/react"`
   pulls the entire library into every bundle that touches it (a single
   ~12MB chunk shared by nearly every route). Importing each icon from its
   own module path keeps only the icons actually used in the bundle.
   Regenerate by re-running the icon-map script if new icons are added. */

export { default as AltArrowDown } from "@solar-icons/react/arrows/AltArrowDown";
export { default as AltArrowLeft } from "@solar-icons/react/arrows/AltArrowLeft";
export { default as AltArrowRight } from "@solar-icons/react/arrows/AltArrowRight";
export { default as ArrowLeft } from "@solar-icons/react/arrows/ArrowLeft";
export { default as ArrowRight } from "@solar-icons/react/arrows/ArrowRight";
export { default as ArrowUp } from "@solar-icons/react/arrows/ArrowUp";
export { default as Bell } from "@solar-icons/react/notifications/Bell";
export { default as Bill } from "@solar-icons/react/money/Bill";
export { default as BillList } from "@solar-icons/react/money/BillList";
export { default as Bolt } from "@solar-icons/react/ui/Bolt";
export { default as Box } from "@solar-icons/react/ui/Box";
export { default as BranchingPathsDown } from "@solar-icons/react/map/BranchingPathsDown";
export { default as BranchingPathsUp } from "@solar-icons/react/map/BranchingPathsUp";
export { default as Buildings } from "@solar-icons/react/building/Buildings";
export { default as Calendar } from "@solar-icons/react/time/Calendar";
export { default as Chart } from "@solar-icons/react/business/Chart";
export { default as ChartSquare } from "@solar-icons/react/business/ChartSquare";
export { default as ChatDots } from "@solar-icons/react/messages/ChatDots";
export { default as ChatRound } from "@solar-icons/react/messages/ChatRound";
export { default as CheckCircle } from "@solar-icons/react/ui/CheckCircle";
export { default as CheckSquare } from "@solar-icons/react/ui/CheckSquare";
export { default as CloseCircle } from "@solar-icons/react/ui/CloseCircle";
export { default as Cloud } from "@solar-icons/react/weather/Cloud";
export { default as Code } from "@solar-icons/react/it/Code";
export { default as Code2 } from "@solar-icons/react/it/Code2";
export { default as CodeSquare } from "@solar-icons/react/it/CodeSquare";
export { default as Compass } from "@solar-icons/react/map/Compass";
export { default as Cpu } from "@solar-icons/react/devices/Cpu";
export { default as DangerTriangle } from "@solar-icons/react/ui/DangerTriangle";
export { default as Database } from "@solar-icons/react/ui/Database";
export { default as DocumentText } from "@solar-icons/react/notes/DocumentText";
export { default as DollarMinimalistic } from "@solar-icons/react/money/DollarMinimalistic";
export { default as Export } from "@solar-icons/react/arrows-action/Export";
export { default as Eye } from "@solar-icons/react/security/Eye";
export { default as FileText } from "@solar-icons/react/files/FileText";
export { default as Filter } from "@solar-icons/react/ui/Filter";
export { default as Graph } from "@solar-icons/react/business/Graph";
export { default as HamburgerMenu } from "@solar-icons/react/ui/HamburgerMenu";
export { default as Heart } from "@solar-icons/react/like/Heart";
export { default as Key } from "@solar-icons/react/security/Key";
export { default as Layers } from "@solar-icons/react/tools/Layers";
export { default as Letter } from "@solar-icons/react/messages/Letter";
export { default as ListCheck } from "@solar-icons/react/list/ListCheck";
export { default as LockKeyhole } from "@solar-icons/react/security/LockKeyhole";
export { default as MagicStick } from "@solar-icons/react/ui/MagicStick";
export { default as MagicStick2 } from "@solar-icons/react/ui/MagicStick2";
export { default as MagicStick3 } from "@solar-icons/react/ui/MagicStick3";
export { default as Magnifer } from "@solar-icons/react/search/Magnifer";
export { default as MapPoint } from "@solar-icons/react/map/MapPoint";
export { default as Moon } from "@solar-icons/react/weather/Moon";
export { default as Planet } from "@solar-icons/react/astronomy/Planet";
export { default as PlugCircle } from "@solar-icons/react/devices/PlugCircle";
export { default as Programming } from "@solar-icons/react/it/Programming";
export { default as Route } from "@solar-icons/react/map/Route";
export { default as Routing } from "@solar-icons/react/map/Routing";
export { default as Scale } from "@solar-icons/react/arrows-action/Scale";
export { default as Server } from "@solar-icons/react/devices/Server";
export { default as Server2 } from "@solar-icons/react/devices/Server2";
export { default as ServerSquare } from "@solar-icons/react/devices/ServerSquare";
export { default as Shield } from "@solar-icons/react/security/Shield";
export { default as ShieldCheck } from "@solar-icons/react/security/ShieldCheck";
export { default as SpeedometerMax } from "@solar-icons/react/parts/SpeedometerMax";
export { default as SquareArrowRightUp } from "@solar-icons/react/arrows/SquareArrowRightUp";
export { default as Sun } from "@solar-icons/react/weather/Sun";
export { default as Target } from "@solar-icons/react/ui/Target";
export { default as Ticket } from "@solar-icons/react/money/Ticket";
export { default as TrashBin2 } from "@solar-icons/react/ui/TrashBin2";
export { default as Tuning } from "@solar-icons/react/settings/Tuning";
export { default as Tuning2 } from "@solar-icons/react/settings/Tuning2";
export { default as Upload } from "@solar-icons/react/arrows-action/Upload";
export { default as UserRounded } from "@solar-icons/react/users/UserRounded";
export { default as UsersGroupRounded } from "@solar-icons/react/users/UsersGroupRounded";
export { default as Wallet } from "@solar-icons/react/money/Wallet";
export { default as Widget } from "@solar-icons/react/settings/Widget";
export { default as Widget2 } from "@solar-icons/react/settings/Widget2";
