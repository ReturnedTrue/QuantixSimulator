export function playerIsPremium(player: Player) {
	return player.MembershipType === Enum.MembershipType.Premium;
}
