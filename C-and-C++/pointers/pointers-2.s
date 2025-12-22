	.section	__TEXT,__text,regular,pure_instructions
	.build_version macos, 26, 0	sdk_version 26, 1
	.globl	_main                           ; -- Begin function main
	.p2align	2
_main:                                  ; @main
	.cfi_startproc
; %bb.0:
	sub	sp, sp, #144
	stp	x29, x30, [sp, #128]            ; 16-byte Folded Spill
	add	x29, sp, #128
	.cfi_def_cfa w29, 16
	.cfi_offset w30, -8
	.cfi_offset w29, -16
	mov	w8, #0                          ; =0x0
	stur	w8, [x29, #-44]                 ; 4-byte Folded Spill
	stur	wzr, [x29, #-4]
	sub	x8, x29, #16
	str	x8, [sp, #48]                   ; 8-byte Folded Spill
	stur	wzr, [x29, #-16]
	sub	x8, x29, #12
	str	x8, [sp, #40]                   ; 8-byte Folded Spill
	stur	wzr, [x29, #-12]
	sub	x8, x29, #8
	str	x8, [sp, #32]                   ; 8-byte Folded Spill
	stur	wzr, [x29, #-8]
	adrp	x0, l_.str@PAGE
	add	x0, x0, l_.str@PAGEOFF
	bl	_printf
	ldr	x11, [sp, #32]                  ; 8-byte Folded Reload
	ldr	x10, [sp, #40]                  ; 8-byte Folded Reload
	ldr	x8, [sp, #48]                   ; 8-byte Folded Reload
	mov	x9, sp
	str	x11, [x9]
	str	x10, [x9, #8]
	str	x8, [x9, #16]
	adrp	x0, l_.str.1@PAGE
	add	x0, x0, l_.str.1@PAGEOFF
	bl	_scanf
	ldur	w8, [x29, #-8]
	ldur	w9, [x29, #-12]
	add	w8, w8, w9
	ldur	w9, [x29, #-16]
	add	w10, w8, w9
	mov	x9, sp
                                        ; implicit-def: $x8
	mov	x8, x10
	str	x8, [x9]
	adrp	x0, l_.str.2@PAGE
	add	x0, x0, l_.str.2@PAGEOFF
	bl	_printf
	sub	x9, x29, #20
	str	x9, [sp, #64]                   ; 8-byte Folded Spill
	mov	w8, #5                          ; =0x5
	stur	w8, [x29, #-20]
	sub	x8, x29, #24
	str	x8, [sp, #56]                   ; 8-byte Folded Spill
	mov	w10, #10                        ; =0xa
	stur	w10, [x29, #-24]
	stur	x9, [x29, #-32]
	stur	x8, [x29, #-40]
	ldur	w8, [x29, #-20]
	mov	x10, x8
	ldur	w8, [x29, #-24]
                                        ; kill: def $x8 killed $w8
	mov	x9, sp
	str	x10, [x9]
	str	x8, [x9, #8]
	adrp	x0, l_.str.3@PAGE
	add	x0, x0, l_.str.3@PAGEOFF
	stur	x0, [x29, #-56]                 ; 8-byte Folded Spill
	bl	_printf
	ldr	x1, [sp, #56]                   ; 8-byte Folded Reload
	ldr	x0, [sp, #64]                   ; 8-byte Folded Reload
	bl	_swap
	ldur	x0, [x29, #-56]                 ; 8-byte Folded Reload
	ldur	w8, [x29, #-20]
	mov	x10, x8
	ldur	w8, [x29, #-24]
                                        ; kill: def $x8 killed $w8
	mov	x9, sp
	str	x10, [x9]
	str	x8, [x9, #8]
	bl	_printf
	ldur	w0, [x29, #-44]                 ; 4-byte Folded Reload
	ldp	x29, x30, [sp, #128]            ; 16-byte Folded Reload
	add	sp, sp, #144
	ret
	.cfi_endproc
                                        ; -- End function
	.globl	_swap                           ; -- Begin function swap
	.p2align	2
_swap:                                  ; @swap
	.cfi_startproc
; %bb.0:
	sub	sp, sp, #32
	.cfi_def_cfa_offset 32
	str	x0, [sp, #24]
	str	x1, [sp, #16]
	str	wzr, [sp, #12]
	ldr	x8, [sp, #24]
	ldr	w8, [x8]
	str	w8, [sp, #12]
	ldr	x8, [sp, #16]
	ldr	w8, [x8]
	ldr	x9, [sp, #24]
	str	w8, [x9]
	ldr	w8, [sp, #12]
	ldr	x9, [sp, #16]
	str	w8, [x9]
	add	sp, sp, #32
	ret
	.cfi_endproc
                                        ; -- End function
	.section	__TEXT,__cstring,cstring_literals
l_.str:                                 ; @.str
	.asciz	"Enter 3 numbers: "

l_.str.1:                               ; @.str.1
	.asciz	"%d %d %d"

l_.str.2:                               ; @.str.2
	.asciz	"Result: %d\n"

l_.str.3:                               ; @.str.3
	.asciz	"x: %d, y: %d\n"

.subsections_via_symbols
